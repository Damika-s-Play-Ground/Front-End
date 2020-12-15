
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

let cart: any = null;

$("#btn-submit-to-cart").click(async ()=>{
    let orderId = <string>$("#txt-order-id").val();
    let itemCode = <string>$("#txt-Code").val();
    let qty = <string>$("#txt-qty1").val();
    let unitPrice = <string>$("#txt-unitprice1").val();

    console.log(qty,unitPrice)
    
    
    if (cart) {
        ($("#tbl-cart") as any).DataTable().destroy();
        $("#tbl-cart tbody tr").remove();
    }

    
        $("#tbl-cart tbody").append(`
            <tr>
                <td>${orderId}</td>
                <td>${itemCode}</td>
                <td>${qty}</td>
                <td>${unitPrice}</td>
                <td><i class="fas fa-trash"></i></td>
            </tr>
        `);
        cart = ($("#tbl-cart") as any).DataTable({
            "info": false,
            "searching": false,
            "lengthChange": false,
            "pageLength": 5,
            "ordering": false,
        });
        console.log()
        // cart.page(Math.ceil(customers.length / 5) - 1).draw(false);
      
    
});