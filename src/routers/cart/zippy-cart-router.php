<?php
namespace ZIPPY_WASH\Src\Routers\Cart;

use ZIPPY_WASH\Src\App\Models\Carts\Zippy_Api_Cart_Model;
/**
 * Bookings General Router
 *
 *
 */

defined('ABSPATH') or die();

use ZIPPY_WASH\Src\App\Models\Products\Zippy_Api_Product_Model;
use ZIPPY_WASH\Src\Controllers\Web\Zippy_Cart_Controller;
use ZIPPY_WASH\Src\Controllers\Web\Zippy_Product_Controller;
use ZIPPY_WASH\Src\Middleware\Admin\ZIPPY_WASH_Permission;

class Zippy_Cart_Router
{

  protected static $_instance = null;

  /**
   * @return Zippy_Cart_Router
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
    add_action('rest_api_init', array($this, 'zippy_wash_cart_init_api'));
  }

  public function zippy_wash_cart_init_api()
  {
    register_rest_route(ZIPPY_WASH_API_NAMESPACE, '/zippy-add-to-cart', array(
      'methods' => 'POST',
      'callback' => [Zippy_Cart_Controller::class, 'add_to_cart'],
      'args' => Zippy_Api_Cart_Model::get_add_to_cart_args(),
      'permission_callback' => array(ZIPPY_WASH_Permission::class, 'zippy_permission_callback'),
    ));

    register_rest_route(ZIPPY_WASH_API_NAMESPACE, '/zippy-get-product-in-cart', array(
      'methods' => 'GET',
      'callback' => [Zippy_Cart_Controller::class, 'get_products_in_cart'],
      'args' => [],
      'permission_callback' => array(ZIPPY_WASH_Permission::class, 'zippy_permission_callback'),
    ));
  }
}
