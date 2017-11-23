

Set the Elastic Configuration
firebase functions:config:set elastic.url="THE API KEY" elastic.key="THE CLIENT ID"

curl -XPOST 'https://vr9dvohifl:tuvnkl9u48@first-cluster-8947855740.us-west-2.bonsaisearch.net/record/Company/LqaP2AuSppkxi3j3xa1n' -H 'Content-Type: application/json' -d '{ "id" : "LqaP2AuSppkxi3j3xa1n", "Name" : "test" }'

curl -XPOST https://vr9dvohifl:tuvnkl9u48@first-cluster-8947855740.us-west-2.bonsaisearch.net/record
curl -XGET https://vr9dvohifl:tuvnkl9u48@first-cluster-8947855740.us-west-2.bonsaisearch.net/_search?q=*

curl -X PUT https://vr9dvohifl:tuvnkl9u48@first-cluster-8947855740.us-west-2.bonsaisearch.net/record -H 'Content-Type: application/json' -d '
  {
    'mappings': {
      'Company': {
        'properties': {
          'id' : { 'type' : 'text' },
          'Name' : { 'type' : 'text' }
        }
      }
    }
  }'



curl -XPOST 'https://vr9dvohifl:tuvnkl9u48@first-cluster-8947855740.us-west-2.bonsaisearch.net/record/Company/sXTb2M5jroIKMyXQv94K' -H 'Content-Type: application/json' -d '{ "id" : "sXTb2M5jroIKMyXQv94K", "Name" : "Exentive" }'
