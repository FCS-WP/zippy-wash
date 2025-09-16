<?php
namespace ZIPPY_WASH\Src\Admin;

use ZIPPY_WASH\Utils\Utils_Core;

class Settings
{
    protected static $_instance = null;

    public static function get_instance()
    {
        return self::$_instance ?? (self::$_instance = new self());
    }

    public function __construct()
    {
        if (!Utils_Core::check_exits_woocommerce()) {
            return;
        }

        add_filter('woocommerce_get_settings_pages', [$this, 'woo_setting_tab']);
        add_action('wp_login', [$this, 'init_session'], 10, 2);
        add_action('init', [$this, 'init_session'], 5);
    }

    public function woo_setting_tab($settings)
    {
        $settings[] = new Woo_Settings();
        return $settings;
    }

    public function init_session()
    {
        if (!WC()->session) {
            WC()->session = new \WC_Session_Handler();
            WC()->session->init();
        }

        if (!WC()->session->has_session()) {
            WC()->session->set_customer_session_cookie(true);
        }
    }
}
