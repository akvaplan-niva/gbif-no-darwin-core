# Darwin Core biodiversity data from Akvaplan-niva, co-funded by GBIF Norway

This repository contains data production pipelines for building [Darwin Core](https://www.tdwg.org/standards/dwc/) datasets for publication in the [Global Biodiversity Information Facility](https://www.gbif.org/), with permanent archiving in [Zenodo](https://sandbox.zenodo.org/communities/akvaplan-raw)

## EcoTaxa

#### Datasets

> Notice: These are pre-production URLs, for testing purposes only

- [818](https://sandbox.zenodo.org/record/748731) – https://www.gbif.org/tools/data-validator/1614975526032 https://sandbox.zenodo.org/api/files/6554259d-f42c-4904-b4bb-015cfd1bdb2e
- [1420](https://sandbox.zenodo.org/record/750936) – https://www.gbif.org/tools/data-validator/1614975526031
- [2751](https://sandbox.zenodo.org/record/753563) – https://www.gbif.org/tools/data-validator/1614975526029

#### Workflow

- Export [EcoTaxa](https://ecotaxa.obs-vlfr.fr/) data as TSV (using DOI export with images)
- Publish untreated TSV and images to Zenodo

- Create Darwin Core occurrences in NDJSON from EcoTaxa TSV, using [\_](https://github.com/akvaplan-niva)
- Create unique Darwin Core sampling events in NDJSON by reducing the occurrences
- @todo Merge with other/authoritative event metadata (eg. sampling volumes)
- Create lists of ignored (not-living) and rejected (non-Eukaryota) objects
- Create lists of rejected events (non-unique or invalid/non-consistent metadata)
- Finish local processing by executing Darwin Core pipelines below

```sh
gbif-no-darwin-core$ ./bin/ecotaxa-pipeline 1420
Starting EcoTaxa pipeline [2021-03-23T20:13+00:00]
Creating Darwin Core occurrences NDJSON from https://ecotaxa.obs-vlfr.fr/prj/1420 TSV in ./dist/ecotaxa-project-1420/dwc-ndjson
Creating Darwin Core events NDJSON from https://ecotaxa.obs-vlfr.fr/prj/1420 TSV in ./dist/ecotaxa-project-1420/dwc-ndjson
Extracting Darwin Core event metadata in ./dist/ecotaxa-project-1420/dwc-ndjson
Extracting Darwin Core taxonomy metadata in ./dist/ecotaxa-project-1420/dwc-ndjson
Creating Darwin Core archive ./dist/ecotaxa-project-1420/dwc-ndjson/ecotaxa-project-1420-dwc-archive.zip from ./dist/ecotaxa-project-1420/dwc-a
Creating meta.xml from ./dist/ecotaxa-project-1420/dwc-a
Core (Event): event.tsv
Found 14 DwC fields [
  "eventDate",
  "samplingProtocol",
  "fieldNumber",
  "locality",
  "sampleSizeValue",
  "sampleSizeUnit",
  "decimalLongitude",
  "decimalLatitude",
  "maximumDepthInMeters",
  "minimumDepthInMeters",
  "eventRemarks",
  "recordedBy",
  "datasetID",
  "eventID"
]
Found 1 other fields [ "occurrences" ]
Core id is eventID index 13
Extension (Occurrence): occurrence.tsv ./dist/ecotaxa-project-1420/dwc-a
Found 10 DwC fields [
  "taxonID",
  "scientificName",
  "eventID",
  "fieldNumber",
  "occurrenceStatus",
  "locality",
  "basisOfRecord",
  "organismQuantity",
  "organismQuantityType",
  "occurrenceID"
]
Found 1 other fields [ "canonicalName" ]
updating: taxonomy.tsv (deflated 73%)
updating: meta.xml (deflated 77%)
updating: occurrence.tsv (deflated 79%)
updating: event.tsv (deflated 78%)
Finished creating Darwin Core archive ./dist/ecotaxa-project-1420/dwc-ndjson/ecotaxa-project-1420-dwc-archive.zip
Line counts
138336 ./_tmp/ecotaxa/1420/ecotaxa_export_1420_20201111_1226.tsv
       7 ./dist/ecotaxa-project-1420/dwc-ndjson/depths.ndjson
   58111 ./dist/ecotaxa-project-1420/dwc-ndjson/dwc-occurrences-ecotaxa-project-1420.ndjson
      70 ./dist/ecotaxa-project-1420/dwc-ndjson/dwc-sampling-events-ecotaxa-project-1420.ndjson
       6 ./dist/ecotaxa-project-1420/dwc-ndjson/ignored-objects.ndjson
       1 ./dist/ecotaxa-project-1420/dwc-ndjson/rejected-event-id-not-unique.ndjson
      10 ./dist/ecotaxa-project-1420/dwc-ndjson/rejected-objects.ndjson
       3 ./dist/ecotaxa-project-1420/dwc-ndjson/sampling-protocols.ndjson
      19 ./dist/ecotaxa-project-1420/dwc-ndjson/taxa.ndjson
      19 ./dist/ecotaxa-project-1420/dwc-ndjson/taxonomy-coverage.ndjson
       7 ./dist/ecotaxa-project-1420/dwc-ndjson/taxonomy-higher-issues.ndjson
       0 ./dist/ecotaxa-project-1420/dwc-ndjson/taxonomy-issues.ndjson
      19 ./dist/ecotaxa-project-1420/dwc-ndjson/taxonomy.ndjson
       1 ./dist/ecotaxa-project-1420/dwc-ndjson/warn-event-metadata-inconsistent.ndjson
   58273 total
Finished EcoTaxa pipeline [2021-03-23T20:15+00:00]
```

## Darwin Core pipelines

#### Taxonomy

- Create taxonomy NDJSON by extracting occurrence taxa and checking against [GBIF Species API](https://www.gbif.org/developer/species) using [WoRMS](https://www.gbif.org/dataset/2d59e5db-57ad-41ff-97d6-11f5fb264527)
- Create lists of possible taxonomy issues (not found or incertae sedis)

#### Metadata

- Extract time coverage (start/end, years, months, days, dates)
- Extract space coverage (bounding box/depths)
- Extract sampling protocols
- Create EML XML

#### Archive

[Metafile](https://dwc.tdwg.org/text/)

- Create [meta.xml](https://dwc.tdwg.org/text/) with file metadata for event core (event.tsv) and extensions (occurrence.tsv taxonomy.tsv)
- Set default fields for occurrenceStatus ("present"), basisOfRecord (MO?) and organismQuantityType ("individuals")

Event Core

- Reduce occurrences by rolling up to one line per taxon per sample and summing organismQuantity

Occurrences extension

- Update resulting occurrences by appending authorship into scientific name and merge-in relevant fields from taxonomy (in particular taxonID)
- Publish NDJSON distribution with zipped Darwin Core archive in [Zenodo](https://sandbox.zenodo.org/communities/akvaplan-raw)

Taxonomy

## Dependencies

@todo

## Project

This project was co-funded by [GBIF Norway](https://www.gbif.no/projects/co-funding-call/2020/akvaplan-niva.html),
see [Data management plan](dmp-zooplankton-gbif-2020) for further details.
