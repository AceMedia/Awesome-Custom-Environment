<?php
class DayNightManager {
    public function __construct() {
        add_action('wp_ajax_set_day_night_color_scheme', [$this, 'set_day_night_color_scheme']);
        add_action('profile_personal_options', [$this, 'custom_day_night_color_options']);
        add_action('edit_user_profile', [$this, 'custom_day_night_color_options']);
        add_action('personal_options_update', [$this, 'save_day_night_color_options']);
        add_action('edit_user_profile_update', [$this, 'save_day_night_color_options']);
        add_filter('get_user_option_admin_color', [$this, 'apply_day_night_theme_based_on_time'], 10, 3);
    }

    public function is_daytime() {
        $current_hour = (int) date('G');
        return ($current_hour >= 6 && $current_hour < 18);
    }

    public function set_day_night_color_scheme() {
        check_ajax_referer('color_scheme_nonce', 'nonce');

        if (!current_user_can('edit_user', get_current_user_id())) {
            wp_send_json_error(__('Permission denied', 'custom-admin-color-options'));
        }

        $theme = sanitize_text_field($_POST['theme']);
        $type = sanitize_text_field($_POST['type']);
        $meta_key = $type === 'day' ? 'day_color_scheme' : 'night_color_scheme';

        update_user_meta(get_current_user_id(), $meta_key, $theme);

        wp_send_json_success();
    }

    public function apply_day_night_theme_based_on_time($color_scheme, $option, $user) {
        $day_theme = get_user_meta($user->ID, 'day_color_scheme', true);
        $night_theme = get_user_meta($user->ID, 'night_color_scheme', true);
        $default_theme = get_user_meta($user->ID, 'default_color_scheme', true);

        if (isset($_COOKIE['timezone_offset'])) {
            $offset_minutes = (int) $_COOKIE['timezone_offset'];
            $local_hour = (int) gmdate('G', time() - $offset_minutes * 60);
            $is_daytime = ($local_hour >= 6 && $local_hour < 18);

            if ($is_daytime) {
                return !empty($day_theme) ? $day_theme : $default_theme;
            } else {
                return !empty($night_theme) ? $night_theme : $default_theme;
            }
        }

        return $color_scheme;
    }

    public function custom_day_night_color_options($user) {
        $day_color = get_user_meta($user->ID, 'day_color_scheme', true);
        $night_color = get_user_meta($user->ID, 'night_color_scheme', true);
        global $_wp_admin_css_colors;
        $color_schemes = $_wp_admin_css_colors;
        ?>
        <h3>Admin Colour Scheme Day/Night Mode Preferences</h3>
        <p>Automatically switches admin color schemes based on time, applying day or night themes as set, or defaulting if none are selected.</p>
        <table class="form-table">
            <tr>
                <th><label for="day_color_scheme">Day Mode Theme</label></th>
                <td>
                    <select name="day_color_scheme" id="day_color_scheme">
                        <option value="">None</option>
                        <?php foreach ($color_schemes as $scheme_id => $scheme) : ?>
                            <option value="<?php echo esc_attr($scheme_id); ?>" <?php selected($day_color, $scheme_id); ?>>
                                <?php echo esc_html($scheme->name); ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </td>
            </tr>
            <tr>
                <th><label for="night_color_scheme">Night Mode Theme</label></th>
                <td>
                    <select name="night_color_scheme" id="night_color_scheme">
                        <option value="">None</option>
                        <?php foreach ($color_schemes as $scheme_id => $scheme) : ?>
                            <option value="<?php echo esc_attr($scheme_id); ?>" <?php selected($night_color, $scheme_id); ?>>
                                <?php echo esc_html($scheme->name); ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </td>
            </tr>
        </table>
        <?php
    }

    public function save_day_night_color_options($user_id) {
        if (!current_user_can('edit_user', $user_id)) {
            return false;
        }

        update_user_meta($user_id, 'day_color_scheme', sanitize_text_field($_POST['day_color_scheme']));
        update_user_meta($user_id, 'night_color_scheme', sanitize_text_field($_POST['night_color_scheme']));
    }
}