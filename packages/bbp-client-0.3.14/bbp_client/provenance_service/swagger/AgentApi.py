#!/usr/bin/env python
"""
WordAPI.py
Copyright 2012 Wordnik, Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

NOTE: This class is auto generated by the swagger code generator program. Do not edit the class manually.
"""
import sys
import os

from models import *


class AgentApi(object):

    def __init__(self, apiClient):
      self.apiClient = apiClient

    
    def get_agent(self, **kwargs):
        """Get prov-dm agents

        Args:
            predicate, str: a predicate on an attribute of the agents. (optional)
            path, str: a path expression (optional)
            
        Returns: null
        """

        allParams = ['predicate', 'path']

        params = locals()
        for (key, val) in params['kwargs'].iteritems():
            if key not in allParams:
                raise TypeError("Got an unexpected keyword argument '%s' to method get_agent" % key)
            params[key] = val
        del params['kwargs']

        resourcePath = '/agent'
        resourcePath = resourcePath.replace('{format}', 'json')
        method = 'GET'

        queryParams = {}
        headerParams = {}

        if ('predicate' in params):
            queryParams['predicate'] = self.apiClient.toStringValue(params['predicate'])
        if ('path' in params):
            queryParams['path'] = self.apiClient.toStringValue(params['path'])
        postData = (params['body'] if 'body' in params else None)

        response = self.apiClient.callAPI(resourcePath, method, queryParams,
                                          postData, headerParams)

        return response
