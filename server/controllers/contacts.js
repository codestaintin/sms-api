import Validator from 'validatorjs';
import db from '../models';

const Contact = db.Contact;

/**
 * Class contacts
 */
export default class Contacts {
  /**
   * Create contact
   * @param req - HTTP Request
   * @param res - HTTP Response
   * @returns {object} - Contact object
   */
  static async create(req, res) {
    const { body } = req;
    const validator = new Validator(body, Contact.createRules());
    if (validator.passes()) {
      try {
        const [ contact, created ] =  await Contact.findOrCreate({
          where: { phoneNumber: body.phoneNumber },
          defaults: { name: body.name }
        });
        if (created) {
          return res.status(201).json({
            message: 'Contact successfully added',
            contact
          })
        }
        return res.status(409).json({
          message: 'Contact already exist'
        })

      } catch (error) {
        return res.status(500).json({
          message: 'A server error occurred',
          error
        })
      }
    }
    return res.status(400).json({
      message: 'A validation error occurred',
      errors: validator.errors.all()
    });
  }

  /**
   * delete contact
   * @param req - HTTP Request
   * @param res - HTTP Response
   * @returns {object} - message object
   */
  static async delete(req, res) {
    const { id } = req.params;
    try {
      const contact = await Contact.findOne({
        where: { phoneNumber: id },
        attributes: ['name', 'phoneNumber']
      });
      if (!contact) {
        return res.status(404).json({
          message: 'Contact not found'
        });
      }
      return contact.destroy()
        .then(() => {
          res.status(200).json({ message: 'Contact successfully deleted'})
        })
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred during this operation', error})
    }
  }

  static async listContacts(req, res) {
    const allContacts = await Contact.findAll();
    if (allContacts.length === 0) {
      return res.status(200).json({
        message: 'You have no contacts on your list'
      })
    }
    return res.status(200).json({
      message: 'Contact List',
      allContacts
    });
  }
}