import { IncomingMessage, ServerResponse } from 'http';
import { find, findOneById, createOne, updateOne, removeOne } from '../db/db';
import { validate } from 'uuid';
import {
  validateFieldsType,
  validateRequiredFields,
} from '../utils/validateFields';

export async function getUsers(_req: IncomingMessage, res: ServerResponse) {
  const allUsers = await find();
  res.statusCode = 200;
  res.end(JSON.stringify(allUsers));
}

export async function getUserById(req: IncomingMessage, res: ServerResponse) {
  const userId = req.url?.split('/')[3];
  if (!userId || !validate(userId)) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'User ID is invalid (not uuid)' }));
    return;
  }
  const user = await findOneById(userId);
  if (user) {
    res.statusCode = 200;
    res.end(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'User not found' }));
  }
}

export function createUser(req: IncomingMessage, res: ServerResponse) {
  let body = '';
  let errors;
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', async () => {
    try {
      const {
        username,
        age,
        hobbies,
      }: { username: string; age: number; hobbies: string[] | [] } =
        JSON.parse(body);
      if (validateRequiredFields(username, age, hobbies)) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Missing required fields' }));
        return;
      }
      if ((errors = validateFieldsType(username, age, hobbies))) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: errors }));
        return;
      }
      const newUser = await createOne({ username, age, hobbies });
      res.statusCode = 201;
      res.end(JSON.stringify(newUser));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Invalid request body' }));
    }
  });
}

export function updateUser(req: IncomingMessage, res: ServerResponse): void {
  let errors;
  const userId = req.url?.split('/')[3];
  if (!userId || !validate(userId)) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'User ID is invalid (not uuid)' }));
    return;
  }
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', async () => {
    try {
      const {
        username,
        age,
        hobbies,
      }: { username: string; age: number; hobbies: string[] } =
        JSON.parse(body);
      if (validateRequiredFields(username, age, hobbies)) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Missing required fields' }));
        return;
      }
      if ((errors = validateFieldsType(username, age, hobbies))) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: errors }));
        return;
      }
      const updatedUser = await updateOne({
        id: userId,
        username,
        age,
        hobbies,
      });
      if (updatedUser) {
        res.statusCode = 200;
        res.end(JSON.stringify(updatedUser));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'User not found' }));
      }
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Invalid request body' }));
    }
  });
}

export async function deleteUser(req: IncomingMessage, res: ServerResponse) {
  const userId = req.url?.split('/')[3];
  if (!userId || !validate(userId)) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'User ID is invalid (not uuid)' }));
    return;
  }
  const deleted = await removeOne(userId);
  if (deleted) {
    res.statusCode = 204;
    res.end();
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'User not found' }));
  }
}
