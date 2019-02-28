import Validator from 'validatorjs'
import { Op } from 'sequelize';
import db from '../models';

const Contact = db.Contact;
const Message = db.Message;


/**
 * Class Message
 */
export default class Messages {
  /**
   * Create Message
   * @param req - HTTP Request
   * @param res - HTTP Response
   * @returns {object} - Contact object
   */
  static async create(req, res) {
    const { body } = req;
    const validator = new Validator(body, Message.createRules());
    if (validator.passes()) {
      try {
        const contacts = await Contact.findAll({
          where: {
            [Op.or]: [
              { phoneNumber: body.senderId },
              { phoneNumber: body.recipientId },
            ],
          }
        });
        if (contacts.length === 0) {
          return res.status(422).json({
            message: 'The sender and recipient are not available'
          })
        }
        if (contacts.length < 2) {
          return res.status(422).json({
            message: 'The sender/recipient are not valid'
          });
        }
        const { content, senderId, recipientId } = body;
        const newMessage = await Message.create({ senderId, recipientId, content });
        return res.status(201).json({
          message: 'Message sent successfully',
          newMessage
        })
      } catch(error) {
        return res.status(500).json({
          message: 'An error occurred during this operation',
          error
        })
      }
    }
    return res.status(400).json({
      message: 'A validation error occurred',
      error: validator.errors.all()
    })
  }

  /**
   * Retrieve contact
   * @param req - HTTP Request
   * @param res - HTTP Response
   * @returns {object} - Contact object
   */
  static async retrieve(req, res) {
    const { id } = req.params;
    const cleanId = Number.parseInt(id, 10);
    try {
      const messageData = await Message.findOne({
        where: { id: cleanId },
        attributes: {
          exclude: ['senderId', 'recipientId']
        },
        include: [
          { model: Contact, as: 'sender', attributes: ['name', 'phoneNumber'] },
          { model: Contact, as: 'recipient', attributes: ['name', 'phoneNumber'] }
        ]
      });
      if (!messageData) {
        return res.status(404).json({
          message: 'Message not found'
        });
      }
      const updatedMessage = await messageData.update({
        status: 'read'
      });
      return res.status(200).json({
        message: 'Message successfully retrieved',
        updatedMessage
      })
    }
    catch (error) {
      return res.status(500).json({
        message: 'An error occurred during this operation'
      })
    }
  }
}