import { v4 as uuidv4 } from 'uuid';

export default function generateTemporaryId() {
  const id = uuidv4();
  const temporaryId = `temp-${id}`;
  return temporaryId;
}
