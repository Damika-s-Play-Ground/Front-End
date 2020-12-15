/**
 * @author : Ranjith Suranga <suranga@ijse.lk>
 * @since : 11/26/20
 **/

import manageCustomers from './manage-customers.component.html';
import style from './manage-customers.component.scss';
import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';
import { deleteCustomer, getAllCustomers, saveCustomer, updateCustomer } from '../service/customer.service';
import { Customer } from '../model/customer';
import { data } from 'jquery';

$("app-manage-customers").replaceWith('<div id="manage-customers">' + manageCustomers + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);

$("#tbl-customers tbody").on('click', 'tr .fas', async (event: Event) => {
    let id = ($(event.target as any).parents("tr").find("td:first-child").text());
    try {
        await deleteCustomer(id);
        alert("Customer has been deleted successfully");
        loadAllCustomers();
    } catch (error) {
        alert("Failed to delete the customer");
    }
});

$("#tbl-customers tbody").on('click', 'tr', async (event: Event) => {
    $("#txt-id").val($(event.target as any).parents("tr").find("td:first-child").text());
    $("#txt-name").val($(event.target as any).parents("tr").find("td:eq(1)").text());
    $("#txt-address").val($(event.target as any).parents("tr").find("td:eq(2)").text());
});

let dataTable: any = null;

function old_loadAllCustomers(): void {
    getAllCustomers().then(function (customers: Array<Customer>) {
        for (const customer of customers) {
            $("#tbl-customers tbody").append(`
                <tr>
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.address}</td>
                    <td><i class="fas fa-trash"></i></td>
                </tr>
            `);
        }
        ($("#tbl-customers") as any).DataTable({
            "info": false,
            "searching": false,
            "lengthChange": false,
            "pageLength": 5,
        });
    }).catch(function () {

    });
}

async function loadAllCustomers() {

    let customers = await getAllCustomers();

    if (dataTable) {
        ($("#tbl-customers") as any).DataTable().destroy();
        $("#tbl-customers tbody tr").remove();
    }

    for (const customer of customers) {
        $("#tbl-customers tbody").append(`
            <tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td><i class="fas fa-trash"></i></td>
            </tr>
        `);
       
    }

    dataTable = ($("#tbl-customers") as any).DataTable({
        "info": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 5,
        "ordering": false,
    });

    dataTable.page(Math.ceil(customers.length / 5) - 1).draw(false);
}

loadAllCustomers();

$("#btn-save").click(async () => {

    let id = <string>$("#txt-id").val();
    let name = <string>$("#txt-name").val();
    let address = <string>$("#txt-address").val();
    /* Font-end validation */
    if (!id.match(/^C\d{3}$/) || name.trim().length === 0 || address.trim().length === 0) {
        alert("Invalid cutomer infromation");
        return;
    }
        try {
            await saveCustomer(new Customer(id, name, address));
            alert("Customer Saved");
            loadAllCustomers();
        } catch (error) {
            alert("Failed to save the customer");
            await updateCustomer(new Customer(id, name, address));
            alert("Customer updated");
            loadAllCustomers();
        }
    
});


$('#btn-clear').click(async () => {
    $("#txt-id").val("")
    $("#txt-name").val("")
    $("#txt-address").val("")
});


