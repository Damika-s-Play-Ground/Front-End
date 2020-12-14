
import searchOrders from './search-orders.component.html';
import style from './search-orders.component.scss';
import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';
//import { deleteCustomer, getAllCustomers, saveCustomer, updateCustomer } from '../service/customer.service';
import { SearchOrder } from '../model/search-order';
import { data } from 'jquery';

$("app-search-orders").replaceWith('<div id="search-orders">' + searchOrders + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);
