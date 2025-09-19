<?php

namespace ZIPPY_WASH\Src\Routers;

/**
 * Bookings General Router
 *
 *
 */

defined('ABSPATH') or die();

use ZIPPY_WASH\Src\Routers\General\Zippy_General_Router;
use ZIPPY_WASH\Src\Routers\Category\Zippy_Category_Router;
use ZIPPY_WASH\Src\Routers\Cart\Zippy_Cart_Router;
use ZIPPY_WASH\Src\Routers\Coupon\Zippy_Coupon_Router;
use ZIPPY_WASH\Src\Routers\Product\Zippy_Product_Router;

class ZIPPY_WASH_Routers
{
  protected static $_instance = null;

  /**
   * @return ZIPPY_WASH_Routers
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
    Zippy_General_Router::get_instance();
    Zippy_Category_Router::get_instance();
    Zippy_Product_Router::get_instance();
    Zippy_Cart_Router::get_instance();
    Zippy_Coupon_Router::get_instance();
  }
}
