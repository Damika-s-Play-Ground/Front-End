
import placeOrders from './place-orders.component.html';
import style from './place-orders.component.scss';
import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';

//import { deleteCustomer, getAllCustomers, saveCustomer, updateCustomer } from '../service/customer.service';
import { PlaceOrder } from '../model/place-order';
import { data } from 'jquery';

$("app-place-orders").replaceWith('<div id="place-orders">' + placeOrders + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);

