// imports the LWC and getDocumentScanner API References to access the library functionality within.
import { LightningElement } from "lwc";
import { getDocumentScanner } from "lightning/mobileCapabilities";

export default class DocumentScanner extends LightningElement {
  // Scan results (if any)
  scannerError;
  scannedDocument;

  handleScanFromCameraClick() {
    this.scanDocument("DEVICE_CAMERA");
  }

  handleScanFromPhotoLibraryClick() {
    this.scanDocument("PHOTO_LIBRARY");
  }

  scanDocument(imageSource) {
    // Clear previous results / errors
    this.resetScanResults();

    // Main document scan cycle
    const myScanner = getDocumentScanner();
    if (myScanner.isAvailable()) {
      const options = {
        imageSource: imageSource,
        scriptHint: "LATIN",
        returnImageBytes: true,
        extractEntities: true,
        entityExtractionLanguageCode: "NL",
      };

      // Perform document scan
      myScanner
        .scan(options)
        .then((results) => {
          // Do something with the results
          this.processScannedDocuments(results);
        })
        .catch((error) => {
          // Handle errors
          this.scannerError =
            "Error code: " + error.code + "\nError message: " + error.message;
        });
    } else {
      // Scanner not available
      this.scannerError =
        "Problem initiating scan. Are you using a mobile device?";
    }
  }

  resetScanResults() {
    this.scannedDocument = null;
    this.scannerError = null;
  }

  processScannedDocuments(documents) {
    this.scannedDocument = documents[0];
    // And this is where you take over; process results as desired
  }

  // Build an annotation overlay graphic, to display on top of the scanned image
  addImageHighlights(event) {
    const textBlocks = this.scannedDocument?.blocks;
    if (!textBlocks) {
      return;
    }

    const img = event.srcElement;
    const cWidth = img.clientWidth;
    const cHeight = img.clientHeight;
    const nWidth = img.naturalWidth;
    const nHeight = img.naturalHeight;
    const width = Math.min(cWidth, nWidth);
    const height = Math.min(cHeight, nHeight);

    let svg =
      ``;
    textBlocks.forEach((block) =>
      block.lines.forEach((line) =>
        line.elements.forEach((element) => {
          const frame = element.frame;
          svg +=
            ``;
        })
      )
    );
    svg += "";

    // Manually attach the overlay SVG to the LWC DOM to render it
    this.template.querySelector(".contour").innerHTML = svg;
  }
}