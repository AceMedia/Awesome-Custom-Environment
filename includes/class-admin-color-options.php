<?php
class CustomAdminColorOptions {
    private $color_scheme_manager;
    private $day_night_manager;

    public function __construct() {
        $this->color_scheme_manager = new ColorSchemeManager();
        $this->day_night_manager = new DayNightManager();

        add_action('admin_bar_menu', [$this, 'add_color_options_to_admin_bar'], 100);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_scripts']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_custom_css']);
    }

    public function enqueue_custom_css() {
        wp_enqueue_style('admin-color-options', plugin_dir_url(dirname(__FILE__)) . 'assets/css/admin-color-options.css');
    }

    public function enqueue_admin_scripts() {
        if (!is_admin()) return;

        wp_enqueue_script('jquery');
        wp_enqueue_script(
            'admin-color-options',
            plugin_dir_url(dirname(__FILE__)) . 'assets/js/js/admin-color-options.js',
            ['jquery'],
            '0.420.0',
            true
        );

        wp_localize_script('admin-color-options', 'colorOptionsAjax', [
            'ajax_url' => admin_url('admin-ajax.php'),
            'adminUrl' => admin_url(),
            'nonce' => wp_create_nonce('color_scheme_nonce')
        ]);

        wp_add_inline_script('jquery', $this->get_timezone_script());
    }

    private function get_timezone_script() {
        return '
            (function() {
                if (!document.cookie.match(/timezone_offset/)) {
                    const timezoneOffset = new Date().getTimezoneOffset();
                    document.cookie = "timezone_offset=" + timezoneOffset + "; path=/";
                    location.reload();
                }
            })();
        ';
    }

    public function add_color_options_to_admin_bar($wp_admin_bar) {
        if (!is_admin()) return;

        $current_user_id = get_current_user_id();
        $day_theme = get_user_meta($current_user_id, 'day_color_scheme', true);
        $night_theme = get_user_meta($current_user_id, 'night_color_scheme', true);
        $is_daytime = $this->day_night_manager->is_daytime();

        $emoji = $this->get_time_emoji($is_daytime, $day_theme, $night_theme);

        $wp_admin_bar->add_node([
            'id' => 'custom-color-options',
            'title' => '<span id="color-indicator" class="color-indicator" style="display:inline-block;width:10px;height:10px;margin-right:5px;background-color:#000;">' . $emoji . '</span>',
            'parent' => 'top-secondary',
        ]);

        $wp_admin_bar->add_node([
            'id' => 'color-scheme-picker',
            'parent' => 'custom-color-options',
            'title' => $this->color_scheme_manager->get_color_picker_html(),
        ]);
    }

    private function get_time_emoji($is_daytime, $day_theme, $night_theme) {
        if ($is_daytime && !empty($day_theme)) {
            return '🌞';
        } elseif (!$is_daytime && !empty($night_theme)) {
            return '🌜';
        }
        return '';
    }
}


add_action('admin_menu', 'ace_add_color_options_page');

function ace_add_color_options_page() {
    add_menu_page(
        'Color Options',       // Page title
        'Color Options',       // Menu title
        'manage_options',      // Capability
        'ace-color-options',  // Menu slug
        'ace_render_color_options_page', // Callback function
        'dashicons-art',       // Icon
        20                     // Position
    );
}





function ace_render_color_options_page() {
    echo '<div id="bolt-color-options-app"></div>';    // Enqueue WordPress dependencies
    wp_enqueue_script('wp-element');   // Provides React and ReactDOM
    wp_enqueue_script('wp-components'); // Provides WordPress UI components
    wp_enqueue_script('wp-api-fetch');  
    wp_enqueue_script('wp-i18n');       // Provides translation functions

    // Enqueue the compiled React script here
    wp_enqueue_script(
        'bolt-color-options-js',
        plugin_dir_url(__FILE__) . '../assets/js/index.js',
        array('wp-element'), // Ensure wp-element is loaded for React
        '1.0',
        true
    );
}

add_action('rest_api_init', function() {
    register_rest_route('wp/v2', '/color-options', array(
        'methods' => 'GET',
        'callback' => 'get_color_options',
    ));

    register_rest_route('wp/v2', '/color-options', array(
        'methods' => 'POST',
        'callback' => 'update_color_options',
        'permission_callback' => function() {
            return current_user_can('manage_options');
        }
    ));
});

function get_color_options() {
    // Retrieve all palettes from wp_options, default to an empty structure
    $color_options = get_option('custom_color_options', array('palettes' => array()));
    return rest_ensure_response($color_options);
}

function update_color_options($request) {
    // Get palettes from the request body
    $palettes = $request->get_param('palettes');
    
    // Validate palettes structure
    if (is_array($palettes)) {
        foreach ($palettes as $palette) {
            // Ensure each palette has an ID, name, and colors array
            if (!isset($palette['id'], $palette['name'], $palette['colors']) || !is_array($palette['colors'])) {
                return new WP_Error('invalid_data', __('Invalid palette structure.', 'custom-admin-color-options'), array('status' => 400));
            }

            // Ensure each color in the palette has an ID, name, and color value
            foreach ($palette['colors'] as $color) {
                if (!isset($color['id'], $color['name'], $color['color'])) {
                    return new WP_Error('invalid_data', __('Invalid color structure.', 'custom-admin-color-options'), array('status' => 400));
                }
            }
        }

        // Save the validated palettes to wp_options
        update_option('custom_color_options', array('palettes' => $palettes));
        return rest_ensure_response(array('success' => true));
    }

    return new WP_Error('invalid_data', __('Invalid palette data.', 'custom-admin-color-options'), array('status' => 400));
}



add_action('admin_init', 'register_custom_admin_color_palettes');

function register_custom_admin_color_palettes() {
    $color_options = get_option('custom_color_options');
    
    if (isset($color_options['palettes']) && is_array($color_options['palettes'])) {
        foreach ($color_options['palettes'] as $palette) {
            $colors = wp_list_pluck($palette['colors'], 'color');
            $colors = array_slice($colors, 0, 5);
            $colors = array_pad($colors, 5, '#ffffff');

            wp_admin_css_color(
                sanitize_key($palette['name']),
                esc_html($palette['name']),
                '',
                $colors
            );

            add_action('admin_head', function() use ($palette, $colors) {
                echo generate_custom_palette_css($palette['name'], $colors);
            });
        }
    }
}

function generate_custom_palette_css($palette_name, $colors) {
    $css = "<style id='custom-admin-palette-{$palette_name}' type='text/css'>\n";
    $css .= "body.admin-color-{$palette_name} {\n";
    $css .= "  --admin-color-primary: {$colors[0]};\n";
    $css .= "  --admin-color-secondary: {$colors[1]};\n";
    $css .= "  --admin-color-accent: {$colors[2]};\n";
    $css .= "  --admin-color-focus: {$colors[3]};\n";
    $css .= "  --admin-color-highlight: {$colors[4]};\n";
    $css .= "}\n";

    // Custom CSS rules for admin colors using the CSS variables
    $css .= "
    body.admin-color-{$palette_name} {
        --wp-admin-color-primary: {$colors[0]};
        --wp-admin-color-secondary: {$colors[1]};
        --wp-admin-color-accent: {$colors[2]};
        --wp-admin-color-focus: {$colors[3]};
        --wp-admin-color-highlight: {$colors[4]};
    }

    /* Admin Bar */
    body.admin-color-{$palette_name} #wpadminbar,
    body.admin-color-{$palette_name} .wp-core-ui .button-primary {
        background-color: var(--wp-admin-color-primary);
        color: #fff;
    }
    body.admin-color-{$palette_name} #wpadminbar .ab-item,
    body.admin-color-{$palette_name} #wpadminbar a.ab-item {
        color: #fff;
    }
    body.admin-color-{$palette_name} #wpadminbar .ab-item:hover {
        color: var(--wp-admin-color-focus);
    }

    /* Sidebar Menu */
    body.admin-color-{$palette_name} #adminmenu,
    body.admin-color-{$palette_name} #adminmenu .wp-submenu,
    body.admin-color-{$palette_name} #adminmenu .wp-submenu a {
        background-color: var(--wp-admin-color-secondary);
        color: #fff;
    }
    body.admin-color-{$palette_name} #adminmenu .wp-submenu a:hover {
        color: var(--wp-admin-color-focus);
    }
    body.admin-color-{$palette_name} #adminmenu .wp-menu-name {
        color: #fff;
    }
    body.admin-color-{$palette_name} #adminmenu .wp-has-current-submenu .wp-submenu,
    body.admin-color-{$palette_name} #adminmenu .wp-submenu-head {
        background-color: var(--wp-admin-color-accent);
    }

    /* Button Colors */
    body.admin-color-{$palette_name} .wp-core-ui .button-secondary {
        background-color: var(--wp-admin-color-secondary);
        color: #fff;
        border-color: var(--wp-admin-color-secondary);
    }
    body.admin-color-{$palette_name} .wp-core-ui .button-primary {
        background-color: var(--wp-admin-color-primary);
        color: #fff;
        border-color: var(--wp-admin-color-primary);
    }
    body.admin-color-{$palette_name} .wp-core-ui .button-primary:hover {
        background-color: var(--wp-admin-color-accent);
        color: #fff;
    }

    /* Highlighted Elements */
    body.admin-color-{$palette_name} .wrap h1,
    body.admin-color-{$palette_name} .wp-core-ui .button:hover,
    body.admin-color-{$palette_name} .notice-success,
    body.admin-color-{$palette_name} .update-nag {
        background-color: var(--wp-admin-color-highlight);
    }
    
    /* Links */
    body.admin-color-{$palette_name} a {
        color: var(--wp-admin-color-focus);
    }
    body.admin-color-{$palette_name} a:hover {
        color: var(--wp-admin-color-accent);
    }
";

    $css .= "</style>\n";

    return $css;
}