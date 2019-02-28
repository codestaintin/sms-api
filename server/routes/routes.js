import contactController from '../controllers/contacts';
import messageController from '../controllers/message';

const routes = (router) => {
  router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to SMS app'})
  });
  /** POST api/v1/contacts/create - Create a new contact */
  router.route('/contact/create').post(contactController.create);
  /** DELETE api/v1/contact/id - Delete a contact */
  router.route('/contact/:id').delete(contactController.delete);
  /** GET api/v1/contact/all - Get all contacts */
  router.route('/contact/all').get(contactController.listContacts);
  /** POST api/v1/message/create - Create a new message */
  router.route('/message/create').post(messageController.create);
  /** GET api/v1/contacts/id - Read a message */
  router.route('/message/:id').get(messageController.retrieve);
};

export default routes;