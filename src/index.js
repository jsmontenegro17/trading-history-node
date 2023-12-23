import app from "./app.js";
import sequelize from './sequelize.js';

import Main from "./models/role.js";
import User from "./models/user.js";
import Role from "./models/role.js";
import UserRole from "./models/userRole.js";

import { createRole } from "./libs/initialSetup.js";

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida correctamente con la base de datos.');

        // Sincronizar los modelos con la base de datos
        // await sequelize.sync({ force: false });
        // console.log('Modelos sincronizados correctamente.');

        // Resto de la lógica de tu aplicación
        // ...

        // Iniciar el servidor
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });

        createRole();

    } catch (error) {
        console.error('Error al conectar y sincronizar la base de datos:', error);
    }
})();