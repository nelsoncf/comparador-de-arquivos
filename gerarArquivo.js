module.exports = {
  gerarArquivos: gerarArquivo
};

function gerarArquivo(arquivos) {
  var endpoints = [];

  arquivos.forEach((file, i) => {
    let curr = file;

    let endpointName = file.split(".")[0];

    let modelo = {
      cacheTimeout: null,
      circleBackground: false,
      colorBackground: false,
      colorValue: false,
      datasource: "Elasticsearch-credenciadora-pci-prod",
      decimals: null,
      defaultColor: "rgb(117, 117, 117)",
      description: curr,
      format: "percent",
      gauge: {
        maxValue: 100,
        minValue: 0,
        show: true,
        thresholdLabels: true,
        thresholdMarkers: true
      },
      gridPos: {
        h: 4,
        w: 4
      },
      id: i + 1,
      interval: null,
      links: [],
      mappingType: 1,
      mappingTypes: [
        {
          name: "value to text",
          value: 1
        },
        {
          name: "range to text",
          value: 2
        }
      ],
      math: "(erro/total)*100",
      maxDataPoints: 100,
      nullPointMode: "connected",
      nullText: null,
      options: {},
      postfix: "",
      postfixFontSize: "50%",
      prefix: "",
      prefixFontSize: "50%",
      rangeMaps: [
        {
          from: "null",
          text: "N/A",
          to: "null"
        }
      ],
      sortOrder: "asc",
      sortOrderOptions: [
        {
          text: "Ascending",
          value: "asc"
        },
        {
          text: "Descending",
          value: "desc"
        }
      ],
      sparkline: {
        fillColor: "rgba(31, 118, 189, 0.18)",
        full: false,
        lineColor: "rgb(31, 120, 193)",
        show: true
      },
      tableColumn: "",
      targets: [
        {
          alias: "total",
          bucketAggs: [
            {
              field: "@timestamp",
              id: "2",
              settings: {
                interval: "auto",
                min_doc_count: 0,
                trimEdges: 0
              },
              type: "date_histogram"
            }
          ],
          metrics: [
            {
              field: "select field",
              id: "1",
              type: "count"
            }
          ],
          query:
            'aplicacao.keyword: "SPD" AND endpoint_nome.keyword: (' +
            endpointName +
            ") AND statusprocessamento_code.keyword:*",
          refId: "A",
          timeField: "@timestamp"
        },
        {
          alias: "erro",
          bucketAggs: [
            {
              field: "@timestamp",
              id: "2",
              settings: {
                interval: "auto",
                min_doc_count: 0,
                trimEdges: 0
              },
              type: "date_histogram"
            }
          ],
          metrics: [
            {
              field: "select field",
              id: "1",
              type: "count"
            }
          ],
          query:
            'aplicacao.keyword: "SPD" AND endpoint_nome.keyword: (' +
            endpointName +
            ") AND statusprocessamento_code.keyword:* AND NOT statusprocessamento_code.keyword: (200 OR 250)",
          refId: "B",
          timeField: "@timestamp"
        }
      ],
      thresholds: [
        {
          color: "#7eb26d",
          value: 5
        },
        {
          color: "#cca300",
          value: 10
        },
        {
          color: "#c15c17",
          value: 15
        },
        {
          color: "#bf1b00",
          value: 100
        }
      ],
      title: endpointName,
      tooltip: {
        show: true
      },
      type: "blackmirror1-singlestat-math-panel",
      valueFontSize: "80%",
      valueMappingColorBackground: "#787879",
      valueMaps: [
        {
          op: "=",
          text: "No data",
          value: "null"
        }
      ],
      valueName: "total"
    };

    endpoints.push(modelo);
  });
  console.log("endpoints", JSON.stringify(endpoints));

  var fs = require("fs");
  var stream = fs.createWriteStream("lista-endpoints.json");
  stream.once("open", function(fd) {
    stream.write(JSON.stringify(endpoints));
    stream.end();
  });

  return endpoints;
}
