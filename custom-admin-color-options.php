<?php
/*
Plugin Name: Custom Admin Color Options 2
Description: Adds color scheme options to the WordPress admin bar on all wp-admin pages with live preview.
Version: 0.420.0
Author: Shane Rounce
*/

if (!defined('ABSPATH')) exit;

require_once plugin_dir_path(__FILE__) . 'includes/class-admin-color-options.php';
require_once plugin_dir_path(__FILE__) . 'includes/class-color-scheme-manager.php';
require_once plugin_dir_path(__FILE__) . 'includes/class-day-night-manager.php';

new CustomAdminColorOptions();