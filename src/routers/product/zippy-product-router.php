<?php
namespace ZIPPY_WASH\Src\Routers\Product;
/**
 * Bookings General Router
 *
 *
 */

defined('ABSPATH') or die();

use ZIPPY_WASH\Src\App\Models\Products\Zippy_Api_Product_Model;
use ZIPPY_WASH\Src\Controllers\Web\Zippy_Product_Controller;
use ZIPPY_WASH\Src\Middleware\Admin\ZIPPY_WASH_Permission;

class Zippy_Product_Router
{

  protected static $_instance = null;

  /**
   * @return Zippy_Product_Router
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
    add_action('rest_api_init', array($this, 'zippy_wash_product_init_api'));
  }

  public function zippy_wash_product_init_api()
  {
    register_rest_route(ZIPPY_WASH_API_NAMESPACE, '/zippy-product-by-category', array(
      'methods' => 'GET',
      'callback' => [Zippy_Product_Controller::class, 'get_products_by_category'],
      'args' => Zippy_Api_Product_Model::get_product_by_category_args(),
      'permission_callback' => array(ZIPPY_WASH_Permission::class, 'zippy_permission_callback'),
    ));
  }
}
