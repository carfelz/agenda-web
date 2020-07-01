<template>
	<div>
	  <div class="search-container">
        <q-item>
            <q-item-label header class="header-wrapper text-h3">Agenda</q-item-label>
            <q-btn
              icon="add"
              size="sm"
              round
              outline
              @click="openModal(null,'')"
              style="font-size:8px;text-transform:capitalize; margin: 30px"
            />
        </q-item>
        <div >
          <q-input
            dense
            debounce="300"
            color="grey-1"
            placeholder="Search"
            v-model="filter"
            style="padding-left:27px;margin-right:50px;margin-top:20px"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>
		<div class="q-pl-xl q-pr-xl">
			<q-table
			title="Contactos"
            icon="add"
			:data="data"
			:columns="columns"
			:filter="filter"
			row-key="name"
			>
                 <template v-slot:body="props">
            <q-tr
              :props="props"
            >
              <q-td
                key="name"
                :props="props"
              >
                {{props.row.name}}
              </q-td>
              <q-td
                key="phone"
                :props="props"
              >
                {{props.row.phone}}
              </q-td>
              <q-td
                key="emailAddress"
                :props="props"
              >
               {{props.row.emailAddress}}
              </q-td>
              <q-td
                key="actions"
                :props="props"
              >
               <q-btn 
                flat
                round
                color='grey'
                @click="openModal(props.row, 'edit')"
                icon='edit'
                ><q-tooltip>Editar contacto</q-tooltip> </q-btn>
                <q-btn 
                 flat
                 round
                 color='grey'
                 icon='cancel'
                 @click='openConfirmModal(props.row.id)'
                ><q-tooltip>Eliminar contacto</q-tooltip></q-btn>
                 <q-btn 
                 flat
                 round
                 color='grey'
                 icon='visibility'
                 @click="openModal(props.row, 'view')"
                ><q-tooltip>Eliminar contacto</q-tooltip></q-btn>   
              </q-td>
              
            </q-tr>
          </template>
            </q-table>
		</div>
        <add-modal ref="addmodal" @added='getContacts()'></add-modal>
        <confirm-dialog ref="confirmDialog" @confirmed="deleteContact"></confirm-dialog>
	</div>
</template>
<script>
import AgendaAPI from '../api/contacts';
import ConfirmDialog from './ConfirmDialog'
import addModal from './AddModal';
export default {
components:{addModal, ConfirmDialog},
created(){
	this.getContacts();
},
data(){
	return{
		data:[],
		filter:'',
		columns:[
			{
				name: 'name',
				label: 'Nombre',
				align: 'left',
				field: 'name',
				sortable: true
			},
			{
				name: 'phone',
				label: 'Telefono',
				align: 'left',
				field: 'phone',
				sortable: true
			},
			{
				name: 'emailAddress',
				label: 'Correo Electronico',
				align: 'left',
				field: 'emailAddress',
				sortable: true
			},
			{
				name: 'actions',
				label: 'Acciones',
				align: 'left'
			}
		]
	}
},

methods:{
	async getContacts(){
		this.data = await AgendaAPI.getContacts();
	},

    openModal(contact, action){
    this.$refs.addmodal.openModal(contact, action);
    },
    async deleteContact(id){
       await AgendaAPI.delete(id).then( res=>{
         this.$q.notify({
             message: 'Contacto Eliminado correctamente',
             color: 'red',
             position: 'bottom-right'
            })   
         this.getContacts();
        });
    },
    openConfirmModal(id){
     this.$refs.confirmDialog.openConfirm(id)
    }

	}
}
</script>
<style scoped>
.search-container{
display:flex;
justify-content: space-between;
}
.header-wrapper{
margin-left: 30px;
}
</style>