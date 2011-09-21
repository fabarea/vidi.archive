==============================
Introduction
==============================


A Digital Asset Management System (DAM) system is a tool to handle digital content like images, text files and virtually any other data format. These media files can be attributed with meta information. Such information can describe the content (description, keywords, location), provide technical data (image size) or copyright information for example. All these information can be used to handle, find and categorize the media files.

Two different forces drive the necessity for advanced management of such assets:

* Large number: Even smaller sites tend to produce large numbers of assets, often stored in random folders and with incoherent naming, making the organization and overview increasingly hard over time. Digital asset management adds a meta-layer of information to every file in a semi-automatic indexing process, allowing users to search for attributes in a database associated with the files.
* Automated retrieval: Assets as building blocks for content often are used to produce automated output, like image galleries and download areas. Digital asset management serves these output functions by providing an interface for retrieving assets filtered by any combination of meta data criteria.

The Digital Asset Management for TYPO3 was developed to address the growing demand for professional asset management in TYPO3 applications and implementations. Even though the first final version is still to come, previous versions have been used in various production settings.

The DAM is similar to the File module integrated into the TYPO3 backend as a main module. It will replace the File module when finished, which means all file handling like copying, deletion and renaming of files is provided by the DAM. Nevertheless the DAM doesn't use a new storage type for files. The files are stored into the file system as before.

This manual is an introduction to the DAM extension. Additional information, as well as pending documentation can be found on Forge: http://forge.typo3.org/projects/extension-dam/wiki/Notes-for- Documentation