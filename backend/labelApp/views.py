import uuid
from typing import List, Dict, Optional
import re

from pydantic import BaseModel
from rest_framework.response import Response
from rest_framework.decorators import api_view


class Output(BaseModel):
    document: Optional[str]
    annotations: Optional[List[Dict]] = []


@api_view(["POST"])
def export_data(request):
    output = Output()
    output.document = request.data['paragraph']
    selected = None
    for annotation in request.data['selected']:
        for match in re.finditer(annotation['selected_text'], request.data['paragraph']):
            selected = match

        output.annotations.append({
            'start': selected.start(),
            'end': selected.end(),
            'label': annotation['label'],
            'text': annotation['selected_text']
        })
    print(output.json())
    with open(f"{uuid.uuid4().hex}.json", "w") as outfile:
        outfile.write(output.json())
    return Response({
        'paragraph': request.data['paragraph'],
        'selected text list': request.data['selected']
    })
