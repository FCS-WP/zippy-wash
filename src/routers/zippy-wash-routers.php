<?php

namespace ZIPPY_WASH\Src\Routers;

/**
 * Bookings General Router
 *
 *
 */

defined('ABSPATH') or die();

use ZIPPY_WASH\Src\Routers\General\Zippy_General_Router;


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
  }
}
