import { pool } from './../db.js';


export const index = async (req, res) => {

    try {

        const [rows] = await pool.query('SELECT * FROM main');
        res.send(rows);
        
    } catch (error) {

        return res.status(500).json({
            message: "Something goes wrong",
        });
        
    }

};

export const show = async (req, res) => {

    try {
        
        const {id} = req.params;

        const [rows] = await pool.query('SELECT * FROM main WHERE id = ?',[id]);
    
        if(rows.length <= 0 ) return res.status(400).json({
            message: "Main not found"
        });
        
        res.send(rows[0]);
        
    } catch (error) {

        return res.status(500).json({
            message: "Something goes wrong",
        });

    }


};

export const store = async (req, res) => {

    try {

        const {name, route, icon} = req.body;

        const [rows] = await pool.query('INSERT INTO main (name,route,icon) VALUES (?,?,?)', [name, route, icon]);
    
        res.send({
            id: rows.insertId,
            name,
            route,
            icon
        });
        
    } catch (error) {
        
        return res.status(500).json({
            message: "Something goes wrong",
        });

    }



};

export const update = async (req, res) => {
    
    try {

        const {id} = req.params;
        const {name, route, icon} = req.body;

        const [resultSetHeader] = await pool.query('UPDATE main SET name = IFNULL(?, name), route = IFNULL(?, route), icon = IFNULL(?, icon) WHERE id = ?', [name, route, icon, id]);

        if(resultSetHeader.affectedRows <= 0) return res.status(400).json({
            message: 'Nothing found to updated'
        });

        res.send({
            id,
            name,
            route,
            icon
        });
        
    } catch (error) {

        return res.status(500).json({
            message: "Something goes wrong",
        });
        
    }

    
    
};

export const destroy = async (req, res) => {

    try {

        const {id} = req.params;

        const [resultSetHeader] = await pool.query('DELETE FROM main WHERE id = ? ',[id]);
           
        if(resultSetHeader.affectedRows <= 0) return res.status(400).json({
            message: 'Nothing found to delete'
        });
    
        res.sendStatus(204);
        
    } catch (error) {

        return res.status(500).json({
            message: "Something goes wrong",
        });
    
    }


    
};