import Role from "../models/role.js";

export const createRole = async () => {
    try {
        
        const roles = await Role.findAll();

        if(roles.length === 0){

            const rolesToCreate = [{id: 1, name: "admin"},{id: 2, name: "investor"},{id: 3, name: "trader"}];
            await Role.bulkCreate(rolesToCreate);
            console.log('roles created successfully');

        }else{
            console.log('there are already roles created');
        }

    } catch (error) {
        
    }
}