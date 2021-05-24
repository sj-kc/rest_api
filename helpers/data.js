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

  edit(props) {
    const { folder, file, data, getData } = props;
    const dataFile = this.getFile(folder, file);

    fs.open(dataFile, 'r+', (err, file) => {
      if (err) return getData(err);

      fs.ftruncate(file, (err) => {
        if (err) return getData(err);

        const stringData = JSON.stringify(data);

        fs.writeFile(file, stringData, (err) => {
          if (err) getData(err);

          fs.close(file, (err) => {
            if (err) return getData(err);
          });
        });
      });
    });
  },

  remove(props) {
    const { folder, file, getData } = props;
    const dataFile = this.getFile(folder, file);

    fs.unlink(dataFile, (err) => {
      if (err) return getData(err);
    });
  },
};

module.exports = lib;
