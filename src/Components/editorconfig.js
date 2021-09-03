export const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, false] }],

  [
    {
      color: [
        '#FF6263',
        '#E21717',
        '#EF5354',
        '#E6425E',
        '#B9345A',
        '#23C4ED',
        '#51E1ED',
        '#207398',
        '#5DA3FA',
        '#03203C',
        '#2827CC',
        '#50DBB4',
        '#4DD637',
        '#3DBE29',
        '#22CB5C',
        '#6EC72D',
        '#E5D68A',
        '#EDBF69',
        '#E8BD0D',
        '#DDD101',
        '#fff',
        '#CAD5E2',
        '#758283',
        '#242B2E',
        '#0D0D0D',
        '#FF6666',
        '#E07C24',
        '#E03B8B',
      ],
    },
    {
      background: [
        '#FF6263',
        '#E21717',
        '#EF5354',
        '#E6425E',
        '#B9345A',
        '#23C4ED',
        '#51E1ED',
        '#207398',
        '#5DA3FA',
        '#03203C',
        '#2827CC',
        '#50DBB4',
        '#4DD637',
        '#3DBE29',
        '#22CB5C',
        '#6EC72D',
        '#E5D68A',
        '#EDBF69',
        '#E8BD0D',
        '#DDD101',
        '#fff',
        '#CAD5E2',
        '#758283',
        '#242B2E',
        '#0D0D0D',
        '#FF6666',
        '#E07C24',
        '#E03B8B',
      ],
    },
  ], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ['link'],
  ['clean'], // remove formatting button
];
