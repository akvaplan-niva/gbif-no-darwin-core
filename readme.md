# Darwin Core biodiversity data pipelines

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

- Create Darwin Core occurrences in NDJSON from EcoTaxa TSV, using [ecotaxa-darwin-core](https://github.com/akvaplan-niva/ecotaxa-darwin-core)
- Create unique Darwin Core sampling events in NDJSON by reducing the occurrences
- @todo Merge with other/authoritative event metadata (eg. sampling volumes)
- Create lists of ignored (not-living) and rejected (non-Eukaryota) objects
- Create lists of rejected events (non-unique or invalid/non-consistent metadata)
- Finish local processing by executing Darwin Core pipelines below

```sh
gbif-no-darwin-core$ ./bin/ecotaxa-pipeline 1420

```

## Darwin Core pipelines

#### Taxonomy

- Create taxonomy NDJSON by extracting occurrence taxa and checking against [GBIF Species API](https://www.gbif.org/developer/species) using [WoRMS](https://www.gbif.org/dataset/2d59e5db-57ad-41ff-97d6-11f5fb264527)
- Create lists of possible taxonomy issues (not found or incertae sedis)

#### Metadata

- Extract time coverage (start/end, years, months, days, dates)
- Extract space coverage (bounding box/depths)
- Extract sampling protocols
- @todo Create EML XML

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
