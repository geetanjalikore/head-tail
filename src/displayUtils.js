const formatRecord = (record) => {
  const heading = `==> ${record.fileName} <==`;
  return `${heading}\n${record.content}\n`;
};

const display = ({ log, error }, record, format) => {
  if (record.isError) {
    error(record.message);
    return;
  }
  format ? log(formatRecord(record)) : log(record.content);
};

const displayRecords = ({ log, error }, fileRecords) => {
  const format = fileRecords.length > 1 ? true : false;
  fileRecords.forEach((record) => display({ log, error }, record, format));
};

exports.displayRecords = displayRecords;
