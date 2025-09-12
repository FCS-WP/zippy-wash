<?php
namespace ZIPPY_WASH\Src\Routers\General;
/**
 * Bookings General Router
 *
 *
 */

defined('ABSPATH') or die();

use ZIPPY_WASH\Src\Controllers\Admin\Zippy_Admin_Booking_General_Controller;

use ZIPPY_WASH\Src\App\Models\Zippy_Api_Booking_Model;

use ZIPPY_WASH\Src\Middleware\Admin\ZIPPY_WASH_Permission;

class Zippy_General_Router
{

  protected static $_instance = null;

  /**
   * @return Zippy_wash_General_Router
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
    add_action('rest_api_init', array($this, 'zippy_wash_general_init_api'));
  }

  public function zippy_wash_general_init_api()
  {
    register_rest_route(ZIPPY_WASH_API_NAMESPACE, '/zippy-options', array(
      'methods' => 'POST',
      'callback' => [Zippy_Admin_Booking_General_Controller::class, 'update_option_configs'],
      'args' => Zippy_Api_Booking_Model::get_booking_args(),
      'permission_callback' => array(Zippy_wash_Permission::class, 'zippy_permission_callback'),

    ));


  }
}
