<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'
// import { valueUpdater } from '@lib/utils';
import { Button } from '@lib/ui/button'
import { Checkbox } from '@lib/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@lib/ui/dropdown-menu'

// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@lib/ui/dialog';

import ChevronDownIcon from '@icons/ChevronDownIcon.vue'
import TextInput from '@components/TextInput.vue'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@lib/ui/table'
import {
    FlexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useVueTable,
} from '@tanstack/vue-table'
import { h, ref, watch, onMounted, computed } from 'vue'

import { useToast } from '@lib/ui/toast/use-toast';

// import Button from './Button.vue'
import Modal from './Modal.vue';
import Dialog from './Dialog.vue';
import DeleteModal from './DeleteModal.vue';
import ArrowUpDownIcon from '@icons/ArrowUpDownIcon.vue'
import PlusIcon from '@icons/PlusIcon.vue'

import { useVehicleStore } from '@store/vehicle';
import { useDiscountStore } from '@store/discount';
import { useCustomerStore } from '@store/customer';
import { useBillingStore } from '@store/billing';
import { useBookingStore } from '@store/booking';

import { Customer } from '@types/modules/customer'
import { Vehicle } from '@types/modules/vehicle'
import { Discount } from '@types/modules/discount';
import { Booking } from '@types/modules/booking';
import { Billing } from '@types/modules/billing';


interface TableLibProps<T> {
  data: T[];
  // columns: (keyof T)[];
  dataType: string; // This will hold the type name (like "Customer")
}

const props = defineProps<TableLibProps<any>>();

let data;

watch(() => props.data, (newData) => {
  data.value = newData;
}, { deep: true });

if(props.dataType === "Customer"){
  data = ref<Customer[]>(props.data);
}else if(props.dataType === "Vehicle"){
  data = ref<Vehicle[]>(props.data);
}else if(props.dataType === "Discount"){
  data = ref<Discount[]>(props.data);
}else if(props.dataType === "Billing"){
  data = ref<Billing[]>(props.data);
}else if(props.dataType === "Booking"){
  data = ref<Booking[]>(props.data);
}

const inputVModel = ref('')
const showModal = ref(false);
const showCreateModal = ref(false);
// const selectedRow = ref({});
const selectedRow = ref(null);
const showDeleteModal = ref(false);
const { toast } = useToast();
const isCreateable = ref(false);

const vehicleStore = useVehicleStore();
const discountStore = useDiscountStore();
const customerStore = useCustomerStore();
const bookingStore = useBookingStore();
const billingStore = useBillingStore();

const filteredColumns = computed(() =>
  columns.filter((col) => col.accessorKey !== "action")
);

const editRow = (row) => {
  selectedRow.value = { ...row };
  showModal.value = true;
};

const saveChanges = async (updatedData) => {
  if(props.dataType === "Vehicle"){
    console.log("Updated Data:", updatedData);
    try{
      await vehicleStore.updateVehicle(updatedData.vehicle_id,updatedData);
      await vehicleStore.fetchVehicles();
      toast({
          title: 'Update Successfully',
          description: 'Vehicle data has been updated successfuly',
          variant: 'default',
      });
    }catch(error){
      toast({
          title: 'Update failed',
          description: 'Vehicle data failed to update',
          variant: 'destructive',
      });
    }
  }else if(props.dataType === "Discount"){
    console.log("Updated Data:", updatedData);
    try{
      await discountStore.updateDiscount(updatedData.discount_id,updatedData);
      await discountStore.fetchDiscounts();
      toast({
          title: 'Update Successfully',
          description: 'Discount data has been updated successfuly',
          variant: 'default',
      });
    }catch(error){
      toast({
          title: 'Update failed',
          description: 'Discount data failed to update',
          variant: 'destructive',
      });
    }
  }else if(props.dataType === "Customer"){
    console.log("Updated Data:", updatedData);
    try{
      await customerStore.updateCustomer(updatedData.customer_id,updatedData);
      await customerStore.fetchCustomers();
      toast({
          title: 'Update Successfully',
          description: 'Customer data has been updated successfuly',
          variant: 'default',
      });
    }catch(error){
      toast({
          title: 'Update failed',
          description: 'Customer data failed to update',
          variant: 'destructive',
      });
    }
  }else if(props.dataType === "Booking"){
    console.log("Updated Data:", updatedData);
    try{
      await bookingStore.updateBooking(updatedData.booking_id,updatedData);
      await bookingStore.fetchBookings();
      toast({
          title: 'Update Successfully',
          description: 'Booking data has been updated successfuly',
          variant: 'default',
      });
    }catch(error){
      toast({
          title: 'Update failed',
          description: 'Booking data failed to update',
          variant: 'destructive',
      });
    }
  }else if(props.dataType === "Billing"){
    console.log("Updated Data:", updatedData);
    try{
      await billingStore.updateBilling(updatedData.billing_id,updatedData);
      await billingStore.fetchBillings();
      toast({
          title: 'Update Successfully',
          description: 'Billing data has been updated successfuly',
          variant: 'default',
      });
    }catch(error){
      toast({
          title: 'Update failed',
          description: 'Billing data failed to update',
          variant: 'destructive',
      });
    }
  }

  showModal.value = false;
};

const confirmDelete = (row) => {
  selectedRow.value = row;
  showDeleteModal.value = true;
};

const deleteData = async (row) => {
  if(props.dataType === "Vehicle"){
    try{
      if (!selectedRow.value){
        showDeleteModal.value = false;
        return;
      } 
      showDeleteModal.value = false;
      await vehicleStore.deleteVehicle(selectedRow.value.vehicle_id);
      await vehicleStore.fetchVehicles();
      toast({
          title: 'Delete Successfully',
          description: 'Vehicle data has been deleted successfuly',
          variant: 'default',
      });
    }catch(error){
      showDeleteModal.value = false;
      toast({
          title: 'Delete failed',
          description: 'Vehicle data failed to delete',
          variant: 'destructive',
      });
    }
  }else if(props.dataType === "Discount"){
    try{
      if (!selectedRow.value){
        showDeleteModal.value = false;
        return;
      } 
      showDeleteModal.value = false;
      await discountStore.deleteDiscount(selectedRow.value.discount_id);
      await discountStore.fetchDiscounts();
      toast({
          title: 'Delete Successfully',
          description: 'Discount data has been deleted successfuly',
          variant: 'default',
      });
    }catch(error){
      showDeleteModal.value = false;
      toast({
          title: 'Delete failed',
          description: 'Discount data failed to delete',
          variant: 'destructive',
      });
    }
  }else if(props.dataType === "Customer"){
    try{
      if (!selectedRow.value){
        showDeleteModal.value = false;
        return;
      } 
      showDeleteModal.value = false;
      await customerStore.deleteCustomer(selectedRow.value.customer_id);
      await customerStore.fetchCustomers();
      toast({
          title: 'Delete Successfully',
          description: 'Customer data has been deleted successfuly',
          variant: 'default',
      });
    }catch(error){
      showDeleteModal.value = false;
      toast({
          title: 'Delete failed',
          description: 'Customer data failed to delete',
          variant: 'destructive',
      });
    }
  }else if(props.dataType === "Booking"){
    try{
      if (!selectedRow.value){
        showDeleteModal.value = false;
        return;
      } 
      showDeleteModal.value = false;
      await bookingStore.deleteBooking(selectedRow.value.booking_id);
      await bookingStore.fetchBookings();
      toast({
          title: 'Delete Successfully',
          description: 'Booking data has been deleted successfuly',
          variant: 'default',
      });
    }catch(error){
      showDeleteModal.value = false;
      toast({
          title: 'Delete failed',
          description: 'Booking data failed to delete',
          variant: 'destructive',
      });
    }
  }else if(props.dataType === "Billing"){
    try{
      if (!selectedRow.value){
        showDeleteModal.value = false;
        return;
      } 
      showDeleteModal.value = false;
      await billingStore.deleteBilling(selectedRow.value.billing_id);
      await billingStore.fetchBillings();
      toast({
          title: 'Delete Successfully',
          description: 'Billing data has been deleted successfuly',
          variant: 'default',
      });
    }catch(error){
      showDeleteModal.value = false;
      toast({
          title: 'Delete failed',
          description: 'Billing data failed to delete',
          variant: 'destructive',
      });
    }
  }
}

const handleCreate = async (newData) => {
  if (props.dataType === "Vehicle"){
    showCreateModal.value = false; 
    try{
      await vehicleStore.createVehicle(newData);
      await vehicleStore.fetchVehicles();
      toast({
          title: 'Create Successfully',
          description: 'Vehicle data has been created successfuly',
          variant: 'default',
      });
    }catch(error){
      toast({
          title: 'Create failed',
          description: 'Vehicle data failed to create',
          variant: 'destructive',
      });
    }
  }else if (props.dataType === "Discount"){
    showCreateModal.value = false; 
    try{
      await discountStore.createDiscount(newData);
      await discountStore.fetchDiscounts();
      toast({
          title: 'Create Successfully',
          description: 'Discount data has been created successfuly',
          variant: 'default',
      });
    }catch(error){
      toast({
          title: 'Create failed',
          description: 'Discount data failed to create',
          variant: 'destructive',
      });
    }
  }else if (props.dataType === "Customer"){
    showCreateModal.value = false; 
    console.log(newData)
    try{
      await customerStore.createCustomer(newData);
      await customerStore.fetchCustomers();
      toast({
          title: 'Create Successfully',
          description: 'Customer data has been created successfuly',
          variant: 'default',
      });
    }catch(error){
      toast({
          title: 'Create failed',
          description: 'Customer data failed to create',
          variant: 'destructive',
      });
    }
  }else if (props.dataType === "Booking"){
    showCreateModal.value = false; 
    console.log(newData)
    try{
      await bookingStore.createBooking(newData);
      await bookingStore.fetchBookings();
      toast({
          title: 'Create Successfully',
          description: 'Booking data has been created successfuly',
          variant: 'default',
      });
    }catch(error){
      toast({
          title: 'Create failed',
          description: 'Booking data failed to create',
          variant: 'destructive',
      });
    }
  }else if (props.dataType === "Billing"){
    showCreateModal.value = false; 
    console.log(newData)
    try{
      await billingStore.createBilling(newData);
      await billingStore.fetchBillings();
      toast({
          title: 'Create Successfully',
          description: 'Billing data has been created successfuly',
          variant: 'default',
      });
    }catch(error){
      toast({
          title: 'Create failed',
          description: 'Billing data failed to create',
          variant: 'destructive',
      });
    }
  }
}

const columns: any[] = [];

if (props.dataType === "Customer") {
  isCreateable.value = true;
  columns.push(
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => h('div', {}, row.index + 1),
    },
    {
      accessorKey: 'first_name',
      header: 'First Name',
      cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('first_name')),
    },
    {
      accessorKey: 'last_name',
      header: 'Last Name',
      cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('last_name')),
    },
    // {
    //   accessorKey: 'email',
    //   header: ({ column }) =>
    //     h(Button, { variant: 'ghost', onClick: () => column.toggleSorting(column.getIsSorted() === 'asc') }, 
    //       () => ['Email', h(ArrowUpDownIcon, { class: 'ml-2 h-4 w-4' })]),
    //   cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
    // },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('email')),
    },
    {
      accessorKey: 'phone_number',
      header: 'Phone No.',
      cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('phone_number')),
    },
    {
      accessorKey: 'address',
      header: 'Address',
      cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('address')),
    },
    {
      accessorKey: 'date_of_birth',
      header: 'Date Of Birth',
      cell: ({ row }) => {
        const date = row.getValue('date_of_birth');
        return h('div', { class: 'capitalize' }, date ? new Date(date).toLocaleDateString() : 'N/A');
      },
    },
    {
      accessorKey: 'license_type',
      header: 'License Type',
      cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('license_type')),
    },
    {
      accessorKey: 'register_date',
      header: 'Register Date',
      cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('register_date')),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) =>
        h("div", {}, [
          h(
            "button",
            {
              class:
                "text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center",
              onClick: () => editRow(row.original),
            },
            [
              h("span", {}, [
                h("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "w-4 h-4",
                  innerHTML:
                    '<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />',
                }),
              ]),
              h("span", {}),
              // h("span", {}, "Edit"),
            ]
          ),
          h(
            "button",
            {
              class:
                "text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center",
                onClick: () => confirmDelete(row.original),
            },
            [
              h("span", {}, [
                h("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "w-4 h-4",
                  innerHTML:
                    '<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />',
                }),
              ]),
              // h("span", {}, "Delete"),
              h("span", {}),
            ]
          ),
        ]),
    }
  );
} else if (props.dataType === "Vehicle") {
  isCreateable.value = true;
  columns.push(
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => h('div', {}, row.index + 1),
    },
    {
      accessorKey: 'plate_number',
      header: 'Plate No',
      cell: ({ row }) => h('div', { class: 'uppercase' }, row.getValue('plate_number')),
    },
    {
      accessorKey: 'make',
      header: 'Make',
      cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('make')),
    },
    {
      accessorKey: 'vehicle_model',
      header: 'Model',
      cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('vehicle_model')),
    },
    {
      accessorKey: 'model_year',
      header: 'Year',
      cell: ({ row }) => h('div', {}, row.getValue('model_year')),
    },
    {
      accessorKey: 'vehicle_type',
      header: 'Type',
      cell: ({ row }) => h('div', {}, row.getValue('vehicle_type')),
    },
    {
      accessorKey: 'color',
      header: 'Color',
      cell: ({ row }) => h('div', {}, row.getValue('color')),
    },
    {
      accessorKey: 'mileage',
      header: 'Mileage',
      cell: ({ row }) => h('div', {}, row.getValue('mileage')),
    },
    {
      accessorKey: 'current_service_date',
      header: 'Last Service Date',
      cell: ({ row }) => h('div', {}, row.getValue('current_service_date')),
    },
    {
      accessorKey: 'current_location',
      header: 'Current Location',
      cell: ({ row }) => h('div', {}, row.getValue('current_location')),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => h(
        'span',
        {
          class: row.getValue('status') === 1
            ? 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset'
            : 'inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset'
        },
        row.getValue('status') === 1 ? 'Available' : 'Booked'
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) =>
        h("div", {}, [
          h(
            "button",
            {
              class:
                "text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center",
              onClick: () => editRow(row.original),
            },
            [
              h("span", {}, [
                h("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "w-4 h-4",
                  innerHTML:
                    '<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />',
                }),
              ]),
              h("span", {}),
              // h("span", {}, "Edit"),
            ]
          ),
          h(
            "button",
            {
              class:
                "text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center",
                onClick: () => confirmDelete(row.original),
            },
            [
              h("span", {}, [
                h("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "w-4 h-4",
                  innerHTML:
                    '<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />',
                }),
              ]),
              // h("span", {}, "Delete"),
              h("span", {}),
            ]
          ),
        ]),
    }
  );
} else if (props.dataType === "Discount") {
  isCreateable.value = true;
  columns.push(
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => h('div', {}, row.index + 1),
    },
    {
      accessorKey: 'discount_code',
      header: 'Disount Code',
      cell: ({ row }) => h('div', { class: 'uppercase' }, row.getValue('discount_code')),
    },
    {
      accessorKey: 'discount_description',
      header: 'Discount Description',
      cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('discount_description')),
    },
    {
      accessorKey: 'discount_percentage',
      header: 'Discount Percentage',
      cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('discount_percentage')),
    },
    {
      accessorKey: 'valid_from',
      header: 'Valid From',
      cell: ({ row }) => h('div', {}, row.getValue('valid_from')),
    },
    {
      accessorKey: 'valid_to',
      header: 'Valid To',
      cell: ({ row }) => h('div', {}, row.getValue('valid_to')),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) =>
        h("div", {}, [
          h(
            "button",
            {
              class:
                "text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center",
              onClick: () => editRow(row.original),
            },
            [
              h("span", {}, [
                h("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "w-4 h-4",
                  innerHTML:
                    '<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />',
                }),
              ]),
              h("span", {}),
              // h("span", {}, "Edit"),
            ]
          ),
          h(
            "button",
            {
              class:
                "text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center",
                onClick: () => confirmDelete(row.original),
            },
            [
              h("span", {}, [
                h("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "w-4 h-4",
                  innerHTML:
                    '<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />',
                }),
              ]),
              // h("span", {}, "Delete"),
              h("span", {}),
            ]
          ),
        ]),
    }
  );
} else if (props.dataType === "Booking") {
  isCreateable.value = true;
  columns.push(
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => h('div', {}, row.index + 1),
    },
    {
      accessorKey: 'customer',
      header: 'Customer',
      cell: ({ row }) => h('div', { class: 'uppercase' }, row.getValue('customer')),
    },
    {
      accessorKey: 'vehicle',
      header: 'Vehicle',
      cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('vehicle')),
    },
    {
      accessorKey: 'discount',
      header: 'Discount',
      cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('discount')),
    },
    {
      accessorKey: 'pickup_date',
      header: 'Pickup Date',
      cell: ({ row }) => h('div', {}, row.getValue('pickup_date')),
    },
    {
      accessorKey: 'return_date',
      header: 'Return Date',
      cell: ({ row }) => h('div', {}, row.getValue('return_date')),
    },
    {
      accessorKey: 'pickup_location',
      header: 'Pickup Location',
      cell: ({ row }) => h('div', {}, row.getValue('pickup_location')),
    },
    {
      accessorKey: 'return_location',
      header: 'Return Location',
      cell: ({ row }) => h('div', {}, row.getValue('return_location')),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => h('div', {}, row.getValue('status')),
    },
    {
      accessorKey: 'total_price',
      header: 'Total Price',
      cell: ({ row }) => h('div', {}, row.getValue('total_price')),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) =>
        h("div", {}, [
          h(
            "button",
            {
              class:
                "text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center",
              onClick: () => editRow(row.original),
            },
            [
              h("span", {}, [
                h("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "w-4 h-4",
                  innerHTML:
                    '<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />',
                }),
              ]),
              h("span", {}),
              // h("span", {}, "Edit"),
            ]
          ),
          h(
            "button",
            {
              class:
                "text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center",
                onClick: () => confirmDelete(row.original),
            },
            [
              h("span", {}, [
                h("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "w-4 h-4",
                  innerHTML:
                    '<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />',
                }),
              ]),
              // h("span", {}, "Delete"),
              h("span", {}),
            ]
          ),
        ]),
    }
  );
} else if (props.dataType === "Billing") {
  isCreateable.value = true;
  columns.push(
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => h('div', {}, row.index + 1),
    },
    {
      accessorKey: 'booking',
      header: 'Booking',
      cell: ({ row }) => h('div', { class: 'uppercase' }, row.getValue('booking')),
    },
    {
      accessorKey: 'amount_due',
      header: 'Amount Due',
      cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('amount_due')),
    },
    {
      accessorKey: 'payment_status',
      header: 'Payment Status',
      cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('payment_status')),
    },
    {
      accessorKey: 'payment_method',
      header: 'Payment Method',
      cell: ({ row }) => h('div', {}, row.getValue('payment_method')),
    },
    {
      accessorKey: 'payment_date',
      header: 'Payment Date',
      cell: ({ row }) => h('div', {}, row.getValue('payment_date')),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) =>
        h("div", {}, [
          h(
            "button",
            {
              class:
                "text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center",
              onClick: () => editRow(row.original),
            },
            [
              h("span", {}, [
                h("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "w-4 h-4",
                  innerHTML:
                    '<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />',
                }),
              ]),
              h("span", {}),
              // h("span", {}, "Edit"),
            ]
          ),
          h(
            "button",
            {
              class:
                "text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center",
                onClick: () => confirmDelete(row.original),
            },
            [
              h("span", {}, [
                h("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "w-4 h-4",
                  innerHTML:
                    '<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />',
                }),
              ]),
              // h("span", {}, "Delete"),
              h("span", {}),
            ]
          ),
        ]),
    }
  );
}
// const columns: any[] = [
//   // {
//   //   id: 'select',
//   //   header: ({ table }) => h(Checkbox, {
//   //     'modelValue': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
//   //     'onUpdate:modelValue': value => table.toggleAllPageRowsSelected(!!value),
//   //     'ariaLabel': 'Select all',
//   //   }),
//   //   cell: ({ row }) => h(Checkbox, {
//   //     'modelValue': row.getIsSelected(),
//   //     'onUpdate:modelValue': value => row.toggleSelected(!!value),
//   //     'ariaLabel': 'Select row',
//   //   }),
//   //   enableSorting: false,
//   //   enableHiding: false,
//   // },
//   {
//     accessorKey: 'no',  // You can use any name for the accessorKey
//     header: 'No',
//     cell: ({ row }) => h('div', {}, row.index + 1),  // Using row.index to increment the value
//   },
//   {
//     accessorKey: 'first_name',
//     header: 'First Name',
//     cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('first_name')),
//   },
//   {
//     accessorKey: 'last_name',
//     header: 'Last Name',
//     cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('last_name')),
//   },
//   {
//     accessorKey: 'email',
//     header: ({ column }) => {
//       return h(Button, {
//         variant: 'ghost',
//         onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
//       }, () => ['Email', h(ArrowUpDownIcon, { class: 'ml-2 h-4 w-4' })])
//     },
//     cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
//   },
//   {
//     accessorKey: 'address',
//     header: 'Address',
//     cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('address')),
//   },
//   {
//     accessorKey: 'date_of_birth',
//     header: 'Date Of Birth',
//     cell: ({ row }) => {
//       const date = row.getValue('date_of_birth');
//       const formattedDate = date ? new Date(date).toLocaleDateString() : 'N/A';  // Default if no date
//       return h('div', { class: 'capitalize' }, formattedDate);
//     },
//   },
//   {
//     accessorKey: 'license_type',
//     header: 'License Type',
//     cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('license_type')),
//   },
//   // {
//   //   accessorKey: 'amount',
//   //   header: () => h('div', { class: 'text-right' }, 'Amount'),
//   //   cell: ({ row }) => {
//   //     const amount = Number.parseFloat(row.getValue('amount'))

//   //     // Format the amount as a dollar amount
//   //     const formatted = new Intl.NumberFormat('en-US', {
//   //       style: 'currency',
//   //       currency: 'USD',
//   //     }).format(amount)

//   //     return h('div', { class: 'text-right font-medium' }, formatted)
//   //   },
//   // },
//   {
//     id: 'actions',
//     header: 'Action',
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original

//       return h(ArrowUpDownIcon, {
//         payment,
//         onExpand: row.toggleExpanded,
//       })
//     },
//   },
// ]

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
//   onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
//   onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
//   onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
//   onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
//   onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
    get expanded() { return expanded.value },
  },
})
</script>

<template>
  <div class="w-full">
    <div class="flex items-center py-4 justify-between">
        <!-- <TextInput
            v-model="inputVModel"
            class="max-w-sm"
            placeholder="Filter emails..."
        /> -->
      <!-- <TextInput
        v-model="inputVModel"
        class="max-w-sm"
        placeholder="Filter emails..."
        :model-value="table.getColumn('email')?.getFilterValue() as string"
        @update:model-value=" table.getColumn('email')?.setFilterValue($event)"
      /> -->
      <!-- <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto py-0">
            Columns <ChevronDownIcon class="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
            :key="column.id"
            class="capitalize"
            :model-value="column.getIsVisible()"
            @update:model-value="(value) => {
              column.toggleVisibility(!!value)
            }"
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu> -->
      <div>
        <!-- <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="handleCreate()"
        ><PlusIcon/> Vehicle</Button> -->
        <button v-if="isCreateable" 
          class="text-md px-3 py-1 bg-blue-500 text-white rounded-lg
          hover:bg-blue-600 transition duration-300 flex"
          @click="showCreateModal = true"
        >
          <PlusIcon/>{{ props.dataType }}
        </button>
      </div>
    </div>
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <TableRow :data-state="row.getIsSelected() && 'selected'">
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                </TableCell>
              </TableRow>
              <TableRow v-if="row.getIsExpanded()">
                <TableCell :colspan="row.getAllCells().length">
                  {{ JSON.stringify(row.original) }}
                </TableCell>
              </TableRow>
            </template>
          </template>

          <TableRow v-else>
            <TableCell
              :colspan="columns.length"
              class="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-end justify-end space-x-2 py-4">
      <!-- <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div> -->
      <div class="space-x-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Next
        </Button>
      </div>
    </div>

    <Modal
      :show="showModal"
      title="Edit Row"
      :data="selectedRow"
      :columns="filteredColumns"
      @close="showModal = false"
      @confirm="saveChanges"
    />

    <Dialog
      :show="showCreateModal" 
      title="Create New Record" 
      :columns="columns"
      @close="showCreateModal = false" 
      @create="handleCreate"
    />

    <DeleteModal
      :show="showDeleteModal"
      :rowData="selectedRow"
      @confirm="deleteData"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>