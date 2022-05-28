const singleFileFormat = ({ content }) => content;

const formatRecord = ({ fileName, content }) => {
  const heading = `==> ${fileName} <==`;
  return `${heading}\n${content}\n`;
};

const display = ({ log, error }, record, formatter) => {
  if (record.message) {
    error(record.message);
    return;
  }
  log(formatter(record));
};

const displayRecords = ({ log, error }, fileRecords) => {
  const formatter = fileRecords.length > 1 ? formatRecord : singleFileFormat;
  fileRecords.forEach((record) => display({ log, error }, record, formatter));
};

exports.displayRecords = displayRecords;
