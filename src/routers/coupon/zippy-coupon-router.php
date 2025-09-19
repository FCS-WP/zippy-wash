<?php
namespace ZIPPY_WASH\Src\Routers\Coupon;
/**
 * Bookings General Router
 *
 *
 */

defined('ABSPATH') or die();

use ZIPPY_WASH\Src\App\Models\Coupons\Zippy_Api_Coupon_Model;
use ZIPPY_WASH\Src\App\Models\Products\Zippy_Api_Product_Model;
use ZIPPY_WASH\Src\Controllers\Web\Zippy_Coupon_Controller;
use ZIPPY_WASH\Src\Controllers\Web\Zippy_Product_Controller;
use ZIPPY_WASH\Src\Middleware\Admin\ZIPPY_WASH_Permission;

class Zippy_Coupon_Router
{

  protected static $_instance = null;

  /**
   * @return Zippy_Coupon_Router
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
    add_action('rest_api_init', array($this, 'zippy_wash_coupon_init_api'));
  }

  public function zippy_wash_coupon_init_api()
  {
    register_rest_route(ZIPPY_WASH_API_NAMESPACE, '/zippy-get-coupons', array(
      'methods' => 'GET',
      'callback' => [Zippy_Coupon_Controller::class, 'get_coupons'],
      'args' => Zippy_Api_Coupon_Model::get_coupons_args(),
      'permission_callback' => array(ZIPPY_WASH_Permission::class, 'zippy_permission_callback'),
    ));

    register_rest_route(ZIPPY_WASH_API_NAMESPACE, '/zippy-apply-coupon-to-cart', array(
      'methods' => 'POST',
      'callback' => [Zippy_Coupon_Controller::class, 'apply_coupon_to_cart'],
      'args' => Zippy_Api_Coupon_Model::get_apply_coupons_args(),
      'permission_callback' => array(ZIPPY_WASH_Permission::class, 'zippy_permission_callback'),
    ));

    register_rest_route(ZIPPY_WASH_API_NAMESPACE, '/zippy-get-cart-info-applied-coupon', array(
      'methods' => 'GET',
      'callback' => [Zippy_Coupon_Controller::class, 'get_cart_info_applied_coupon'],
      'args' => [],
      'permission_callback' => array(ZIPPY_WASH_Permission::class, 'zippy_permission_callback'),
    ));

    register_rest_route(ZIPPY_WASH_API_NAMESPACE, '/zippy-remove-coupon-from-cart', array(
      'methods' => 'POST',
      'callback' => [Zippy_Coupon_Controller::class, 'remove_coupon_from_cart'],
      'args' => Zippy_Api_Coupon_Model::get_remove_coupons_args(),
      'permission_callback' => array(ZIPPY_WASH_Permission::class, 'zippy_permission_callback'),
    ));
  }
}
