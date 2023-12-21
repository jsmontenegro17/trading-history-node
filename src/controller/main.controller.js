import { pool } from './../db.js';


export const index = async (req, res) => {

    const [rows] = await pool.query('SELECT * FROM main');
    res.send(rows);

};

export const show = async (req, res) => {

    const {id} = req.params;

    const [rows] = await pool.query('SELECT * FROM main WHERE id = ?',[id]);

    if(rows.length <= 0 ) return res.status(400).json({
        message: "Main not found"
    });
    
    res.send(rows[0]);

};

export const store = async (req, res) => {

    const {name, route, icon} = req.body;

    const [rows] = await pool.query('INSERT INTO main (name,route,icon) VALUES (?,?,?)', [name, route, icon]);

    res.send({
        id: rows.insertId,
        name,
        route,
        icon
    });

};

export const update = (req, res) => res.send('Updating main');

export const destroy = async (req, res) => {

    const {id} = req.params;

    const [resultSetHeader] = await pool.query('DELETE FROM main WHERE id = ? ',[id]);
       
    if(resultSetHeader.affectedRows <= 0) return res.status(400).json({
        message: 'Nothing found to delete'
    });
    
    res.send('Main delete');
    
};