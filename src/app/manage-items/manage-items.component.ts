

import manageItems from './manage-items.component.html';
import style from './manage-items.component.scss';
import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';
import { deleteItem, getAllItmes, saveItem } from '../service/item.service';
import { Item } from '../model/item';

$("app-manage-items").replaceWith('<div id="manage-items">' + manageItems + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);


$("#tbl-items tbody").on('click', 'tr .fas', async (event: Event) => {
    let code = ($(event.target as any).parents("tr").find("td:first-child").text());
    try {
        await deleteItem(code);
        alert("Item has been deleted successfully");
        loadAllItems();
    } catch (error) {
        alert("Failed to delete the item");
    }
});

$("#tbl-items tbody").on('click', 'tr', async (event: Event) => {
    $("#txt-code").val($(event.target as any).parents("tr").find("td:first-child").text());
    $("#txt-description").val($(event.target as any).parents("tr").find("td:eq(1)").text());
    $("#txt-unitprice").val($(event.target as any).parents("tr").find("td:eq(2)").text());
    $("#txt-qty").val($(event.target as any).parents("tr").find("td:eq(3)").text());
});

let dataTable: any = null;


async function loadAllItems() {

    let items = await getAllItmes();

    if (dataTable) {
        ($("#tbl-items") as any).DataTable().destroy();
        $("#tbl-items tbody tr").remove();
    }

    for (const item of items) {
        $("#tbl-items tbody").append(`
            <tr>
                <td>${item.code}</td>
                <td>${item.description}</td>
                <td>${item.unitPrice}</td>
                <td>${item.qtyOnHand}</td>
                <td><i class="fas fa-trash"></i></td>
            </tr>
        `);
       
    }

    dataTable = ($("#tbl-items") as any).DataTable({
        "info": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 5,
        "ordering": false,
    });

    dataTable.page(Math.ceil(items.length / 5) - 1).draw(false);
}

loadAllItems();

$("#btn-save").click(async () => {
    alert("jfksnfmsdf");
    let code = <string>$("#txt-code").val();
    let description = <string>$("#txt-description").val();
    let unitprice = <string>$("#txt-unitprice").val();
    let qty = <string>$("#txt-qty").val();
    /* Front-end validation */
    if (!code.match(/^P\d{3}$/) || description.trim().length === 0 || unitprice.trim().length === 0|| qty.trim().length === 0) {
        alert("Invalid item infromation");
        return;
    }
    
        try {
            await saveItem(new Item(code, description, +unitprice,+qty));
            alert("Item Saved");
            loadAllItems();
        } catch (error) {
            alert("Failed to save the Item");
        }
    
});



$('#btn-clear').click(async () => {
    $("#txt-code").val("")
    $("#txt-description").val("")
    $("#txt-unitprice").val("")
    $("#txt-qty").val("")
});

