import Main from "../models/main.js";

export const index = async (req, res) => {
  try {
    const mains = await Main.findAll();

    if (mains.length === 0) return res.status(200).json({ message: 'No records found' });

    res.send(mains);

  } catch (error) {
    console.error('error retrieving records from the Main table:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const show = async (req, res) => {
  try {
    
    const { id } = req.params;
    const main = await Main.findByPk(id);

    if (!main) {
      return res.status(404).json({ message: 'Main not found' });
    }

    res.send(main);

  } catch (error) {
    console.error('error retrieving record from the Main table:', error);
    res.status(500).json({ message: 'eomething went wrong' });
  }
};

export const store = async (req, res) => {
  try {
    const { name, route, icon } = req.body;
    const newMain = await Main.create({ name, route, icon });

    res.status(201).json(newMain);
  } catch (error) {
    console.error('error creating a new record in the Main table:', error);
    res.status(500).json({ message: 'eomething went wrong' });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, route, icon } = req.body;

    const [updatedCount, updatedMain] = await Main.update(
      { name, route, icon },
      { where: { id }, returning: true }
    );

    if (updatedMain === 0) {
      return res.status(404).json({ message: 'nothing found to update' });
    }

    const main = await Main.findByPk(id);
    res.send(main);

  } catch (error) {
    console.error('error updating record in the Main table:', error);
    res.status(500).json({ message: 'something went wrong' });
  }
};

export const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCount = await Main.destroy({ where: { id } });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'nothing found to delete' });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error('error deleting record from the Main table:', error);
    res.status(500).json({ message: 'something went wrong' });
  }
};
