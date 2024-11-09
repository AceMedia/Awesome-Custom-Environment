<?php
class ColorSchemeManager {
    public function __construct() {
        add_action('wp_ajax_set_admin_color_scheme', [$this, 'set_admin_color_scheme']);
        add_action('wp_ajax_set_default_color_scheme', [$this, 'set_default_color_scheme']);
    }

    public function get_color_picker_html() {
        $current_user_id = get_current_user_id();

        ob_start();
        ?>
        <div id="custom-admin-color-picker" style="padding: 10px;">
            <?php admin_color_scheme_picker($current_user_id); ?>
        </div>
        <?php
        return ob_get_clean();
    }

    public function set_admin_color_scheme() {
        check_ajax_referer('color_scheme_nonce', 'nonce');

        if (!current_user_can('edit_user', get_current_user_id())) {
            wp_send_json_error(__('Permission denied', 'custom-admin-color-options'));
        }

        $color = sanitize_text_field($_POST['color']);
        update_user_meta(get_current_user_id(), 'admin_color', $color);

        wp_send_json_success();
    }

    public function set_default_color_scheme() {
        check_ajax_referer('color_scheme_nonce', 'nonce');

        if (!current_user_can('edit_user', get_current_user_id())) {
            wp_send_json_error(__('Permission denied', 'custom-admin-color-options'));
        }

        $theme = sanitize_text_field($_POST['theme']);
        update_user_meta(get_current_user_id(), 'default_color_scheme', $theme);

        wp_send_json_success();
    }
}