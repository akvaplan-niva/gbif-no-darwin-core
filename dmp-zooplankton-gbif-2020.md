# Standardising Akvaplan-niva's zooplankton data as Darwin Core

## Data management plan

Author: [Conrad Helgeland](mailto:che@akvaplan.niva.no)
License: [Public domain](https://creativecommons.org/publicdomain/zero/1.0/)
Date: 2020-10-30

## 1. Introduction
[Akvaplan-niva](https://akvaplan.niva.no/) has an open [data policy](https://nmdc.no/resources/nmdc/Akvaplan-niva-dataforvaltningspolitikk.pdf) and plans to publish its primary biodiversity data on the web, using the [Darwin Core](https://www.tdwg.org/standards/dwc/) vocabulary.

In response to [GBIF Norway](https://www.gbif.no)'s [data mobilization 2020](https://www.gbif.no/news/2020/data-mobilization-call-2020.html), Akvaplan-niva intends to constribute zooplankton occurrences from several projects, all linked to sampling events.

## 2. Deliverables

For data traceability and data reproducability we will publish the following on https://github.com/akvaplan-niva, for each contributed dataset:
* Input data in untouched form
* Output data in UTF-8 encoded [Darwin Core text](https://dwc.tdwg.org/text/) files
* Source code used for data processing, quality control, and publishing
* Rejected data, log files, and quality control reports

## 3. Data

### Source data (input)
The input data is diverse:

Most newer input data is stored in [EcoTaxa](http://ecotaxa.obs-vlfr.fr), a web tool for taxonomic classification of images.
Data is exported as tab-separated text files where each line corresponds to a Darwin Core occurrence record.
A large portion (~ 50–75 %) of detected objects in EcoTaxa re not classified as organisms, but as artefacts, detritus, feces.

Older data derives from the [ZooProcess](https://doi.org/10.1093/plankt/fbp124) software, also used for zooplankton image analysis.
Data is exported in a a special text format (.pid-file) that contains metadata headers followed by regular CSV after a [Data] line.

A third type of input data is Excel documents in Akvaplan-niva's internal storage.

### Darwin Core (output)

Data modeling is based on GBIF's requirements for [occurrence](https://www.gbif.org/data-quality-requirements-occurrences) data and [sampling events](https://www.gbif.org/data-quality-requirements-sampling-events) and informed by GBIF's [best practices](https://github.com/gbif/ipt/wiki/BestPracticesSamplingEventData#sampling-event-data) for sampling event data.

All records will have universally unique identifiers [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)s (`occurrenceID`/`eventID`).
For Taxonomy

Organism occurrence quantification will vary depending on the input data, but we will strive to deliver primary non-aggregated data when available.

For net-based plankton sampling, a common challenge is to estimate the volume of the sampled water.
The consequence is that `sampleSizeValue` is empty if volume is unkown or incalculable.

For taxonomy, we will validate all `scientificName`s against [GBIF's REST API v1](https://www.gbif.org/developer/summary) with [World Register of Marine Species](https://www.gbif.org/dataset/2d59e5db-57ad-41ff-97d6-11f5fb264527) as prefered dataset (example:
[Calanus](https://api.gbif.org/v1/species?name=Calanus&datasetKey=2d59e5db-57ad-41ff-97d6-11f5fb264527)).
