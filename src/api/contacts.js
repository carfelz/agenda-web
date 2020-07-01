import axios from 'axios'
export default{
    async getContacts(){
        let {data} = await axios.get(`http://localhost:1337/agenda/index`);
        return data;
    },
    async addContacts(form){
        let {data} = await axios.post(`http://localhost:1337/agenda/add`, form);
        return data;
    },
    async updateContacs(form){
        let {data} = await axios.put(`http://localhost:1337/agenda/update`, form);
        return data;
    },
    async delete(id){
        let {data} = await axios.delete(`http://localhost:1337/agenda/delete/${id}`)
        return data;
    }
}