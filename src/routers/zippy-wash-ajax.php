<?php

namespace ZIPPY_WASH\Src\Routers;

defined('ABSPATH') or die();

use Zippy_Wash\Utils\Zippy_Cart_Handler;

class ZIPPY_WASH_Ajax
{
    protected static $_instance = null;

    public static function get_instance()
    {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct()
    {
        // AJAX cho user login
        add_action('wp_ajax_get_product_in_cart', [$this, 'get_product_in_cart']);
        // AJAX cho guest
        add_action('wp_ajax_nopriv_get_product_in_cart', [$this, 'get_product_in_cart']);
    }

    public function get_product_in_cart()
    {
        Zippy_Cart_Handler::ensure_cart_session();

        $cart_handler = new Zippy_Cart_Handler();
        $items = $cart_handler->get_cart_items();

        $data = [];

        foreach ($items as $cart_item_key => $cart_item) {
            $data[] = [
                'product_id' => $cart_item['product_id'],
                'quantity'   => $cart_item['quantity'],
                'name'       => $cart_item['data']->get_name(),
                'price'      => wc_price($cart_item['data']->get_price()),
                'total'      => wc_price($cart_item['line_total']),
                'image'      => wp_get_attachment_url($cart_item['data']->get_image_id()),
            ];
        }

        wp_send_json_success($data);
    }
}
