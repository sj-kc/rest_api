const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../.data');

const lib = {
  getFile(folder, file) {
    const dataFile = `${dataDir}/${folder}/${file}.json`;
    return dataFile;
  },

  create(props, getData) {
    const { folder, file, data } = props;
    const dataFile = this.getFile(folder, file);

    fs.open(dataFile, 'wx', (err, file) => {
      if (err) return getData(err);

      const stringData = JSON.stringify(data);

      fs.writeFile(file, stringData, (err) => {
        if (err) return getData(err);

        fs.close(file, (err) => {
          if (err) return getData(err);

          return getData(false);
        });
      });
    });
  },

  read(props, getData) {
    const { folder, file } = props;
    const dataFile = this.getFile(folder, file);

    fs.readFile(dataFile, 'utf8', (err, data) => {
      if (!err && data) {
        const parsedData = JSON.parse(data);
        return getData(undefined, parsedData);
      }
      getData(err);
    });
  },

  edit(props, getData) {
    const { folder, file, data } = props;
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

  remove(props, getData) {
    const { folder, file } = props;
    const dataFile = this.getFile(folder, file);

    fs.unlink(dataFile, (err) => {
      if (err) return getData(err);
    });
  },
};

module.exports = lib;
