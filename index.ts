import { CreateAssetProps, createClient, Entry } from 'contentful-management'
import { contentfulHelper } from './contenfulConfig';
import { Movie } from './types';

// 
const movieSample: Movie = {
  name: {
    "en-US": 'pelicula 4'
  },
  adult: {
    "en-US": false,
  },
  description: {
    "en-US": {
      data: {},
      nodeType: 'document',
      content: [
        {
          data: {},
          content: [{
            data: {},
            marks: [],
            nodeType: 'text',
            value: 'la cuarta mejor pleli con imagen'
          }],
          nodeType: 'paragraph',
        }
      ]
    }
  },
  duration: {
    "en-US": 'toda una vida'
  },
  price: {
    "en-US": 200
  },
  //reference
  genres: {
    "en-US": [
      {
        sys: {
          id: '4zyKVFGO67D9ZnRjgz8gee',
          linkType: 'Entry',
          type: 'Link'
        }
      }
    ]
  },
  //asset ref
  image: {
    "en-US": {
      sys: {
        id: '3uFFTTFIsuWWbfuXcxOd9v',
        linkType: 'Asset',
        type: 'Link'
      }
    }
  }
}
//ejemplo genero miedo
//{ type: 'Link', linkType: 'Entry', id: '4zyKVFGO67D9ZnRjgz8gee' }
//ejemplo linkear asset
//{ type: 'Link', linkType: 'Asset', id: '2nJlVwULBQjsbTQSfVk7dj' }

//ejemplo creacion de imagen
const asset1: CreateAssetProps = {
  fields: {
    title: {
      'en-US': 'asset 1'
    },
    description: {
      'en-US': 'first example of asset upload by content managment api'
    },
    file: {
      'en-US': {
        contentType: 'image/webp',
        fileName: 'my-first-image-test.webp',
        upload: 'https://occ-0-1595-3933.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABZcQsRT8h64hXXVbJvotmH4p2vb-FsxDVcCrGt98u1R2fLr1FpSSoRf3koKTtXzclvyUFZDYatHpRY5R7HzxGTPsDQ6zPCdSWeY5.webp?r=c6a'
      }
    }
  }
}


function main() {
  //create and publish an entry
  contentfulHelper.createEntry(movieSample).then(async (e) => {
    const res = await contentfulHelper.publishEntry(e);
    console.log(res);
  });
  // return all entries
  contentfulHelper.
    retriveEntry().then((entry) => entry.items.forEach((i) => {
      console.log(i.fields);
    }));
  //return all assets of a space
  // contentfulHelper.getAllAssets()
  //   .then(assets => assets.items.map(a => console.log(a.fields.file)));
  //create asset
  // contentfulHelper.createAsset(asset1).then(a => console.log(a));
}

main()
