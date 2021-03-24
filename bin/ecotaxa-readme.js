//
//       # Dataset
//       # cat $DWC_NDJSON/time-coverage.json | nd-map '[min, max ] = d,
//       #   datasetID = Deno.env.get("DATASET_ID"),
//       #   ecotaxaURL = Deno.env.get("ECOTAXA_URL"),
//       #   datasetName =  Deno.env.get("C"),
//       #   rightsHolder = "Akvaplan-niva",
//       #   institutionID = "https://akvaplan.niva.no",
//       #   license = "https://creativecommons.org/licenses/by/4.0/",
//       #   references = ecotaxaURL,
//       #   { eventID: datasetID, eventDate: `${min}/${max}`, datasetName, datasetID, institutionID, license, rightsHolder, references }' \
//       #   > $DWC_NDJSON/dwc-dataset.json
// echo -e '${DATASET_NAME}
const genreadme0 = () => `# ${title}

${doi}

## Data flow
This dataset is built using a fully automated and repeatable processing pipeline from data exported from ${ecotaxaURL}.

Input data: [EcoTaxa TSV](${ecotaxaURL}) (permanent archive)

Pipeline: [gbif-no-darwin-core](https://github.com/akvaplan-niva/gbif-no-darwin-core)

The data production pipeline generates two Darwin Core distributions
- Newline separated JSON (NDJSON)
- Darwin Core Archive (TSV)

@todo GBIF Dataset URL/ID ${id}

## License
$DATASET_NAME by [Akvaplan-niva](https://www.akvaplan.niva.no/) is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
`;

const doi = Deno.env.get("DATASET_DOI");
const id = Deno.env.get("DATASET_ID");
const title = Deno.env.get("DATASET_NAME");
const ecotaxaURL = Deno.env.get("ECOTAXA_URL");

const readme0 = genreadme0({ doi, title, ecotaxaURL });
console.log(readme0);
