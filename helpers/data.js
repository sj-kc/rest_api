const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../.data');

const lib = {
  getFile(folder, file) {
    const dataFile = `${dataDir}/${folder}/${file}.json`;
    return dataFile;
  },

  create(props) {
    const { folder, file, data, getData } = props;

    const dataFile = this.getFile(folder, file);

    fs.open(dataFile, 'wx', (err, file) => {
      if (err) return getData(err);

      const stringData = JSON.stringify(data);

      fs.writeFile(file, stringData, (err) => {
        if (err) return getData(err);

        fs.close(file, (err) => {
          if (err) return getData(err);
        });
      });
    });
  },

  read(props) {
    const { folder, file, getData } = props;
    const dataFile = this.getFile(folder, file);

    fs.readFile(dataFile, 'utf8', (err, data) => {
      if (err) return getData(err);
      return getData(undefined, data);
    });
  },
};

module.exports = lib;
