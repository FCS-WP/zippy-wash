<?php

/**
 * Woocommece Booking Settings
 *
 *
 */

namespace ZIPPY_WASH\Src\Woocommerce;

defined('ABSPATH') or die();

use ZIPPY_WASH\Utils\Zippy_Utils_Core;
use ZIPPY_WASH\Src\Woocommerce\Zippy_Wc_Discounts;
use ZIPPY_WASH\Src\Woocommerce\Zippy_Wc_Cart;

class Zippy_Wash_Woo
{
  protected static $_instance = null;

  /**
   * @return Zippy_Wash_Woo
   */

  public static function get_instance()
  {
    if (is_null(self::$_instance)) {
      self::$_instance = new self();
    }
    return self::$_instance;
  }

  public function __construct()
  {
    if (!function_exists('is_plugin_active')) {

      include_once(ABSPATH . 'wp-admin/includes/plugin.php');
    }
    if (!is_plugin_active('woocommerce/woocommerce.php')) return;

    $this->set_hooks();
  }

  protected function set_hooks()
  {

  }
}
