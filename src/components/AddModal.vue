<template>
	<div>
        <q-dialog 
            v-model="isOpen"
            @hide="cleanModal"
            @before-hide="cleanModal"
            @escape-key="cleanModal"
            >
            <q-card>
                <q-card-section label>
                <span>{{ isAdding ?"Agregar nuevo contacto": `${form.name}` }}</span>
               </q-card-section>
                <q-card-section>
                    <q-form
                     @submit="submit"   
                    >
                     <q-input
                        outlined
                        v-model="form.name"
                        label="Nombre completo"
                        dense
                        color="secondary"
                        :readonly="isReadonly"
                        style="width:500px; margin-bottom: 10px;"/>

                     <q-input
                        outlined
                        v-model="form.phone"
                        label="Numero de telefono"
                        dense
                        color="secondary"
                        :readonly="isReadonly"
                        mask="(###) ### - ####"
                        style="width:500px; margin-bottom: 10px;"/>

                        <q-input
                        outlined
                        v-model="form.emailAddress"
                        label="Correo electronico"
                        type="email"
                        dense
                        color="secondary"
                        :readonly="isReadonly"
                        style="width:500px; margin-bottom: 10px;"
                        />
                        <q-card-section style="border-top:1px #eee solid;padding:10px;" v-if="!isReadonly && isAdding">
                            <q-btn
                            align="right"
                            label="Save"
                            style="text-transform:capitalize;font-size:12px;margin-bottom:15px"
                            color="blue-grey-4"
                            class="float-right"
                            type="submit"
                            ></q-btn>
                        </q-card-section>
                        <q-card-section style="border-top:1px #eee solid;padding:10px;" v-else>
                            <q-btn
                            align="right"
                            label="Save"
                            style="text-transform:capitalize;font-size:12px;margin-bottom:15px"
                            color="blue-grey-4"
                            class="float-right"
                            @click="submitEdit"
                            ></q-btn>
                        </q-card-section>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>
<script>
import agendaAPI from '../api/contacts'
export default {
    data(){
    return{
    isOpen: false,
    isReadonly: false,
    isAdding: true,
    action: '',
    form:{
     name: '',
     phone: '',
     emailAddress: ''       
    }
}
},

methods:{
    openModal(contact, action){
    if(action == 'view'){
      this.form = {...contact};
      this.isReadonly = true
      this.isAdding = false 
    }else if(action == 'edit'){
        this.form = {...contact}
        this.isAdding = false
        this.action = 'edit'
     }
    this.isOpen = true
   },
    cleanModal(){
    this.isAdding = true
    this.isReadonly= false
    this.form.name = ''
    this.form.phone = ''
    this.form.emailAddress = ''
   },

async submitEdit(){
await agendaAPI.updateContacs(this.form).then( ()=>{
            this.$emit('added')
            this.isOpen = false;
            this.$q.notify({
             message: 'Contacto modificado correctamente',
             color: 'amber',
             position: 'bottom-right'
            })
        }).catch(err =>{
         this.$q.notify({
             message: 'Hubo un error',
             color: 'red',
             position: 'bottom-right'
            })
        })
},
   async submit(){
         await agendaAPI.addContacts(this.form).then( ()=>{
            this.$emit('added')
            this.isOpen = false;
            this.$q.notify({
             message: 'Contacto agregado correctamente',
             color: 'amber',
             position: 'bottom-right'
            })
        });
    
}
}

}
</script>