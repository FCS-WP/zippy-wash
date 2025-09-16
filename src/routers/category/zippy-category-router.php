<?php
namespace ZIPPY_WASH\Src\Routers\Category;
/**
 * Bookings General Router
 *
 *
 */

defined('ABSPATH') or die();

use ZIPPY_WASH\Src\Controllers\Admin\Zippy_Admin_Booking_General_Controller;

use ZIPPY_WASH\Src\App\Models\Zippy_Api_Booking_Model;
use ZIPPY_WASH\Src\Controllers\Web\Zippy_Category_Controller;
use ZIPPY_WASH\Src\Middleware\Admin\ZIPPY_WASH_Permission;

class Zippy_Category_Router
{

  protected static $_instance = null;

  /**
   * @return Zippy_Category_Router
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
    add_action('rest_api_init', array($this, 'zippy_wash_category_init_api'));
  }

  public function zippy_wash_category_init_api()
  {
    register_rest_route(ZIPPY_WASH_API_NAMESPACE, '/zippy-category', array(
      'methods' => 'GET',
      'callback' => [Zippy_Category_Controller::class, 'get_categories'],
      'args' => [],
      'permission_callback' => array(ZIPPY_WASH_Permission::class, 'zippy_permission_callback'),
    ));
  }
}
