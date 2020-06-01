mainApp.service('Session', function() {
	this.create = function(data) {
		this.id = data.id;
		this.firstName = data.firstName;
		this.la;
angular.module('mainApp.services', [])

    .service('SessionService', function ($localStorage) {
        let user = null;
        return {
            saveSession: (token) => {
                if (token !== null) {
                    let data = parseJwt(token);
                    user = {
                        userID: data.userID,
                        name: data.name,
                        gender: data.gender,
                        contactNumber: data.contactNumber,
                        emailID: data.emailID,
                        password: data.password,
                        profilePicture: data.profile,
                        role: data.role,
                        companyID: data.companyID
                    };
                }
                return user;
            },
            getSession: () => {
                return user;
            },
            setSession: (session) => {
                user = session;
            },
            logOut: () => {
                user = null;
                $localStorage.token = null;
            }
        };
    })

    .service('DashboardService', function ($log, $http) {
        return {
            getDashboardData: function (successCallback, failureCallback) {
                $http.get(BASE_URL + 'dashboard').success(successCallback).error(failureCallback);
            }
        };
    })

    .service('AuthService', ['$http', '$localStorage', function ($http, $localStorage) {
        var API_NAME = 'accounts/auth';
        return {
            add: function (user, successCallback, failureCallback) {
                $http.post(BASE_URL + API_NAME, user).success(successCallback).error(failureCallback);
            },
            update: function (userID, user, successCallback, failureCallback) {
                $http.put(BASE_URL + 'accounts/profile/' + userID, user).success(successCallback).error(failureCallback);
            },
            getAll: function (successCallback, failureCallback) {
                $http.get(BASE_URL + '/accounts/profile/{id}').success(successCallback).error(failureCallback);
            },
            changePassword: function (user, successCallback, failureCallback) {
                $http.patch(BASE_URL + 'accounts/change-password/', user).success(successCallback).error(failureCallback);
            },
            register: function (user, successCallback, failureCallback) {
                $http.post(BASE_URL + 'accounts/register', user).success(successCallback).error(failureCallback);
            }
        };
    }])

    .service('DoctorService', ['$http', '$localStorage', function ($http, $localStorage) {
        var API_NAME = 'doctor';
        return {
            add: function (doctor, successCallback, failureCallback) {
                $http.post(BASE_URL + API_NAME, doctor).success(successCallback).error(failureCallback);
            },
            update: function (doctorID, doctor, successCallback, failureCallback) {
                $http.put(BASE_URL + API_NAME + '/' + doctorID, doctor).success(successCallback).error(failureCallback);
            },
            getAll: function (successCallback, failureCallback) {
                $http.get(BASE_URL + API_NAME + '?companyID=-1&userID=-1').success(successCallback).error(failureCallback);
            }
        };
    }])

    .service('ReviewService', ['$http', '$localStorage', function ($http, $localStorage) {
        var API_NAME = 'review';
        return {
            add: function (review, successCallback, failureCallback) {
                $http.post(BASE_URL + API_NAME, review).success(successCallback).error(failureCallback);
            },
            update: function (reviewID, review, successCallback, failureCallback) {
                $http.put(BASE_URL + API_NAME + '/' + reviewID, review).success(successCallback).error(failureCallback);
            },
            getAll: function (doctorID, companyID, jobNumber, patientName, status, userID, successCallback, failureCallback) {
                $http.get(BASE_URL + API_NAME + '?doctorID=' + doctorID + '&companyID=' + companyID + '&jobNumber=' + jobNumber + '&patientName=' + patientName + '&status=' + status + '&userID=' + userID).success(successCallback).error(failureCallback);
            },
            getByID: function (reviewID, successCallback, failureCallback) {
                $http.get(BASE_URL + API_NAME + '/' + reviewID).success(successCallback).error(failureCallback);
            },
            getAllRec: function (successCallback, failureCallback) {
                $http.get(BASE_URL + API_NAME + '?doctorID=-1&companyID=-1&userID=-1').success(successCallback).error(failureCallback);
            },
            UploadDocFile: function (review, successCallback, failureCallback) {
                $http.post(BASE_URL + 'review-Document', review).success(successCallback).error(failureCallback);
            },
            GetPatientRecordFile: function (reviewID, userID, successCallback, failureCallback) {
                $http.get(BASE_URL + 'review-Document?reviewID=' + reviewID + ' &type=RECORD' + '&userID=' + userID).success(successCallback).error(failureCallback);
            },
            GetDictationFile: function (reviewID, userID, successCallback, failureCallback) {
                $http.get(BASE_URL + 'review-Document?reviewID=' + reviewID + ' &type=DICTATION' + '&userID=' + userID).success(successCallback).error(failureCallback);
            },
            GetRorFile: function (reviewID, userID, successCallback, failureCallback) {
                $http.get(BASE_URL + 'review-Document?reviewID=' + reviewID + ' &type=ROR' + '&userID=' + userID).success(successCallback).error(failureCallback);
            },
            GetCompletedFile: function (reviewID, userID, successCallback, failureCallback) {
                $http.get(BASE_URL + 'review-Document?reviewID=' + reviewID + ' &type=COMPLETED' + '&userID=' + userID).success(successCallback).error(failureCallback);
            },
            GetFinalReport: function (reviewID, userID, successCallback, failureCallback) {
                $http.get(BASE_URL + 'review-Document?reviewID=' + reviewID + ' &type=BILL' + '&userID=' + userID).success(successCallback).error(failureCallback);
            },
            DeleteDocument: function (reviewDocument, successCallback, failureCallback) {
                $http.post(BASE_URL + 'review-Document-delete', reviewDocument).success(successCallback).error(failureCallback);
            },
            DownloadZIP: function (files, successCallback, failureCallback) {
                $http({
                    method: "GET",
                    url: `${BASE_URL}review-Document/download-zip?files=${files}`,
                    params: {},
                    responseType: "arraybuffer",
                    cache: false
                }).then(response => successCallback(response))
                    .catch(error => failureCallback(error));

                //$http.get(BASE_URL + 'review-Document/download-zip?files=' + files).success(successCallback).error(failureCallback);
            },
            UploadByJobNumber: function (review, successCallback, failureCallback) {
                $http.post(BASE_URL + 'review-Document/UploadByJobNumber', review).success(successCallback).error(failureCallback);
            },
            changeStatus: function (data, successCallback, failureCallback) {
                $http.post(BASE_URL + API_NAME + '/changeStatus', data).success(successCallback).error(failureCallback);
            },
            sendEmailAfterFileUpload: (jobId, createdByEmail, createdby, firstName, lastName, fileName, successCallback, failureCallback) => {
                $http.post(BASE_URL + 'review-Document/send-email/patient-record?jobID=' + jobId + '&jobCreatedByEmailID=' + createdByEmail +
                    '&jobCreatedBy=' + createdby + '&firstName=' + firstName + '&lastName=' + lastName + '&fileName=' + fileName).success(successCallback).error(failureCallback);
            },
            sendEmailPatientCompleted: (jobId, createdByEmail, createdby, firstName, lastName, type, successCallback, failureCallback) => {
                $http.post(BASE_URL + 'review-Document/send-email/patient-record-completed?jobID=' + jobId + '&jobCreatedByEmailID=' + createdByEmail +
                    '&jobCreatedBy=' + createdby + '&firstName=' + firstName + '&lastName=' + lastName + '&type=' + type).success(successCallback).error(failureCallback);
            },
            sendEmailTicketIssued: (ticket, emailID, userName, firstName, lastName, msg, successCallback, failureCallback) => {
                $http.post(BASE_URL + 'review-Document/send-email/ticket-issued?ticket=' + ticket + '&ticketRaisedByEmailID=' + emailID +
                    '&ticketRaisedBy=' + userName + '&firstName=' + firstName + '&lastName=' + lastName + '&message=' + msg).success(successCallback).error(failureCallback);
            },
            sendEmailTicketReply: (emailDetails, successCallback, failureCallback) => {
                $http.post(
                    `${BASE_URL}review-Document/send-email/ticket-reply?jobID=${emailDetails.jobID}&ticketRaisedByEmailID=${emailDetails.emailID}&ticketRaisedBy=${emailDetails.userName}&firstName=${emailDetails.firstName}&lastName=${emailDetails.lastName}&ticketReply=${emailDetails.ticketReply}`)
                    .success(successCallback).error(failureCallback);
            },
            sendEmailOnDictations: (data, successCallback, failureCallback) => {
                $http.post(BASE_URL + 'review-Document/Dictation/send-email', data).success(successCallback).error(failureCallback);
            }
        };
    }])

    .service('UserService', ['$http', '$localStorage', function ($http, $localStorage) {
        var API_NAME = 'user';
        return {
            add: function (user, successCallback, failureCallback) {
                $http.post(BASE_URL + API_NAME, user).success(successCallback).error(failureCallback);
            },
            update: function (userID, user, successCallback, failureCallback) {
                $http.put(BASE_URL + API_NAME + '/' + userID, user).success(successCallback).error(failureCallback);
            },
            getAll: function (companyID, role, successCallback, failureCallback) {
                $http.get(BASE_URL + API_NAME + '?companyID=' + companyID + '&role=' + role).success(successCallback).error(failureCallback);
            },
            activeDeactive: function (user, successCallback, failureCallback) {
                $http.post(BASE_URL + API_NAME + '/active-deactive', user).success(successCallback).error(failureCallback);
            },
            getAllCompany: function (userID, role, successCallback, failureCallback) {
                $http.get(BASE_URL + 'company?userID=-1' + '&role=' + role).success(successCallback).error(failureCallback);
            }
        };

    }])

    .service('DictationsService', ['$http', '$localStorage', function ($http, $localStorage) {
        return {
            add: function (doctor, successCallback, failureCallback) {
                $http.post(BASE_URL + API_NAME, doctor).success(successCallback).error(failureCallback);
            },
            update: function (doctorID, doctor, successCallback, failureCallback) {
                $http.put(BASE_URL + API_NAME + '/' + doctorID, doctor).success(successCallback).error(failureCallback);
            },
            getAll: function (successCallback, failureCallback) {
                $http.get(BASE_URL + 'dictation-list?reviewDocumentID=-1&reviewID=-1&userID=-1').success(successCallback).error(failureCallback);
            }
        };
    }])

    .service('TicketService', ['$http', '$localStorage', function ($http, $localStorage) {
        var API_NAME = 'ticket';
        return {
            add: function (ticket, successCallback, failureCallback) {
                $http.post(BASE_URL + API_NAME, ticket).success(successCallback).error(failureCallback);
            },
            update: function (doctorID, doctor, successCallback, failureCallback) {
                $http.put(BASE_URL + API_NAME + '/' + doctorID, doctor).success(successCallback).error(failureCallback);
            },
            getByReviewID: function (reviewID, successCallback, failureCallback) {
                $http.get(BASE_URL + API_NAME + '?reviewID=' + reviewID).success(successCallback).error(failureCallback);
            },
            addReplay: function (ticket, successCallback, failureCallback) {
                $http.post(BASE_URL + 'ticketReply', ticket).success(successCallback).error(failureCallback);
            },
            getAllReply: function (reviewID, ticketID, successCallback, failureCallback) {
                $http.get(BASE_URL + 'ticketReply?ticketID=' + ticketID + '&userID=-1&reviewID=' + reviewID).success(successCallback).error(failureCallback);
            },
            getAllTickets: function (successCallback, failureCallback) {
                $http.get(BASE_URL + 'ticket').success(successCallback).error(failureCallback);
            },
            getPendingTicket: function (reviewID, userID, successCallback, failureCallback) {
                $http.get(BASE_URL + API_NAME + '/pending?reviewID=' + reviewID + '&userID=' + userID).success(successCallback).error(failureCallback);
            },
            showTicketByID: function (ticketID, successCallback, failureCallback) {
                $http.get(BASE_URL + 'ticket/' + ticketID).success(successCallback).error(failureCallback);
            }
        };
    }])

    .service('mailService', ['$http', '$localStorage', function ($http, $localStorage) {
        var API_NAME = 'sendMail';
        return {
            add: function (successCallback, failureCallback) {
                $http.post(BASE_URL + API_NAME).success(successCallback).error(failureCallback);
            }
        };
    }]);




stName = data.lastName;
		this.email = data.email;
		this.userRoles = [];
		angular.forEach(data.authorities, function(value, key) {
			this.push(value.name);
		}, this.userRoles);
	};
	this.invalidate = function() {
		this.id = null;
		this.login = null;
		this.firstName = null;
		this.lastName = null;
		this.email = null;
		this.userRoles = null;
	};
	return this;
});

mainApp.service('AuthSharedService', function($rootScope, $http, $resource, authService, Session, $timeout) {
	return {
		
		
		login : function(userName, password) {
			//$timeout(function() {
				var config = {
					params : {
						username : userName,
						password : password
					},
					ignoreAuthModule : 'ignoreAuthModule'
				};
				var user = {name : userName, password : password};
				//$http.post('authenticate', user)				
				$http.post('php/authenticate.php', user)
				.success(function(data, status, headers, config) {
					console.log(data);
					authService.loginConfirmed(data);
				})
				.error(function(data, status, headers, config) {
					$rootScope.authenticationError = true;
					Session.invalidate();
				});
			//}, 5000);
		}
		,
		getAccount : function() {
			$rootScope.loadingAccount = true;
			$http.get('security/account')
			.then(function(response) {
				authService.loginConfirmed(response.data);
			});
		},
		isAuthorized : function(authorizedRoles) {
			if (!angular.isArray(authorizedRoles)) {
				if (authorizedRoles == '*') {
					return true;
				}
				authorizedRoles = [ authorizedRoles ];
			}
			var isAuthorized = false;
			angular.forEach(authorizedRoles, function(authorizedRole) {
				var authorized = (!!Session.login && Session.userRoles.indexOf(authorizedRole) !== -1);
				if (authorized || authorizedRole == '*') {
					isAuthorized = true;
				}
			});
			return isAuthorized;
		},
		logout : function() {
			$rootScope.authenticationError = false;
			$rootScope.authenticated = false;
			$rootScope.account = null;
			$http.get('logout');
			Session.invalidate();
			authService.loginCancelled();
		}
	};
});


mainApp.service('DashboardService', function($log, $http) {
	return {
		getDashboardData : function(successCallback) {
			$http.get('php/dashboard.php')
				.success(function(data, status, headers, config) {					
					successCallback(data);
				})
				.error(function(data, status, headers, config) {
					
				});
		}
	}
});


mainApp.service('HomeService', function($log, $resource) {
	return {
		getTechno : function() {
			var userResource = $resource('resources/json/techno.json', {}, {
				query : {
					method : 'GET',
					params : {},
					isArray : true
				}
			});
			return userResource.query();
		}
	}
});

mainApp.service('UsersService', function($log, $resource) {
	return {
		getAll : function() {
			var userResource = $resource('users', {}, {
				query : {
					method : 'GET',
					params : {},
					isArray : true
				}
			});
			return userResource.query();
		}
	}
});

mainApp.service('TokensService', function($log, $resource) {
	return {
		getAll : function() {
			var tokensResource = $resource('security/tokens', {}, {
				query : {
					method : 'GET',
					params : {},
					isArray : true
				}
			});
			return tokensResource.query();
		}
	}
});


//	This service created for customer details
mainApp.service('PartyService', function($log, $resource) {
	var parties = [];
	return {
		add : function(party){
			parties.push(party);
			return true;
		},
		update : function(party){
			parties.push(party);
			return true;
		},
		getAll : function() {
			return parties;
		},
		getByPageNumber : function(pageNumber, itemsPerPage, partyType) {
			/*// pagination CustomerController will call this function with selected pageNumber and itemsPerPage.
			$log.log('PartyService: getByPageNumber: pageNumber=>'+pageNumber);
			$log.log('PartyService: getByPageNumber: itemsPerPage=>'+itemsPerPage);			
			// Buissness logic that server will perform.			
			for(i= pageNumber; i <= (itemsPerPage + pageNumber ); i++)
				parties.push({name : 'Name '+i, gender : 'MALE',phoneNo: 'phoneNo '+1, 
			mobileNo: 'No '+i, address : 'address '+i, city: 'Jalgaon '+i, emailId:'Email ID '+i, 
			partyType : partyType, country: 'India', state: 'Maharashtra'});			
			$log.log('PartyService: getByPageNumber: length=>'+parties.length);*/
			return parties;
		}
	}
});


//	This factory service created for default values of pagination
mainApp.factory('PagingService', function() {
	// returning object of as default value
		return {
			perPageItems : [5, 10, 15, 20], // array to change no items per page
			pageItemSize : 5, // how many items should visible on page.
			pagingSize   : 5, // pagination items are 5
			totalItems   : 50, // this value will filled by server side response
			pageItemIndex: 0 // pageindex by default is 0
		}
});

mainApp.service('ProductService', function($http) {
		var categories = [];
		var subCategories = [];
	// returning object of as default value
		return {
			addCategory : function(productCategory) {						
				categories.push(productCategory);
				return true;
			},
			getAllCategories : function(successCallback) {							

				$http.get('php/productCategories.php')
				.success(function(data, status, headers, config) {					
					successCallback(data);
				})
				.error(function(data, status, headers, config) {
					
				});
				//return categories;
			},
			addSubCategory : function(productSubCategory) {						
				subCategories.push(productSubCategory);
				return true;
			},
			getAllSubCategories : function() {						
				//subCategories.push({categoryName: 'CottonCake', subCategoryName : 'Sub Category', perBagWeight: 45, unit : 'KG'});			
				return subCategories;
			}			
		};
});

mainApp.service('BankService', function($http) {
	//var banks = [];
	// returning object of as default value
	return {
		add : function(bank){
			//banks.push(bank);
			return true;
		},
		update : function(bank){
			//banks.push(bank);
			return true;
		},
		delete : function(bankId){
			//banks.push(bankId);
			return true;
		},
		getAll : function(successCallback) {

			$http.get('php/getAllBanks.php')
				.success(function(data, status, headers, config) {
					//banks = data;		
					successCallback(data);
				})
				.error(function(data, status, headers, config) {
					
				});

			//return banks;
		},
		getByPageNumber : function(pageNumber, itemsPerPage, successCallback) {			
			$http.get('php/getAllBanks.php?index='+pageNumber+'&itemsPerPage='+itemsPerPage)
				.success(function(data, status, headers, config) {
					//banks = data;		
					successCallback(data);
				})
				.error(function(data, status, headers, config) {
					
				});
		}
	};
});

mainApp.service('ExpenseService', function() {
	// returning object of as default value
		return {
			
			getExpenses : function() {
				expenses = [];
				for(i=0; i <= 30; i++){
					expenses.push({date : '2016/01/0'+i, type:'Tea', amount: '10', comment:'-'});
				}
				return expenses;
			}			
		};
});

mainApp.service('StockService', function() {
	// returning object of as default value
		return {
			getStock : function() {
				stocks = [];
				for(i=0; i <= 10; i++){
					stocks.push({category : 'Cotton Cake'+i, subCategory:'Sutali '+i, quantity: 10});
				}
				return stocks;
			}			
		};
});

mainApp.service('InwardService', function() {
	// returning object of as default value
		return {
			getInwards : function() {
				inwards = [];
				for(i=0; i <= 10; i++){
					inwards.push({date : '2016/01/01', invoiceNo:'0'+i, partyName : 'partyName', 
					totalQuantity: 10, totalAmount: 10, isThroughBroker: i % 2 == 0 ? true: false});
				}
				return inwards;
			}			
		};
});

mainApp.service('OutwardService', function() {
	// returning object of as default value
		return {
			getOutwards : function() {
				outwards = [];
				for(i=0; i <= 10; i++){
					outwards.push({date : '2016/01/01', invoiceNo:'0'+i, partyName : 'partyName', 
					totalQuantity: 10, totalAmount: 10, isThroughBroker: i % 2 == 0 ? true: false});
				}
				return outwards;
			}			
		};
});


mainApp.service('ReportInwardService', function() {
	// returning object of as default value
		return {
			getInwards : function() {
				inwards = [];
				for(i=0; i <= 10; i++){
					inwards.push({date : '2016/01/01', invoiceNo:'0'+i, totalQuantity: 10, totalAmount: 10});
				}
				return inwards;
			}			
		};
});

mainApp.service('ReportOutwardService', function() {
	// returning object of as default value
		return {
			getOutwards : function() {
				outwards = [];
				for(i=0; i <= 10; i++){
					outwards.push({date : '2016/01/01', invoiceNo:'0'+i, totalQuantity: 10, totalAmount: 10});
				}
				return outwards;
			}			
		};
});

mainApp.service('StateService', function() {
	// returning object of as default value
	var states = [];
	return {
		getAllStates : function() {							
				states.push({state: 'Andaman and Nicobar'});
				states.push({state: 'Andhra Pradesh'});
				states.push({state: 'Arunachal Pradesh'});
				states.push({state: 'Assam'});
				states.push({state: 'Bihar'});
				states.push({state: 'Chandigarh'});
				states.push({state: 'Chhattisgarh'});
				states.push({state: 'Dadra and Nagar Haveli'});
				states.push({state: 'Daman and Diu'});
				states.push({state: 'Delhi'});
				states.push({state: 'Goa'});
				states.push({state: 'Gujrat'});
				states.push({state: 'Haryana'});
				states.push({state: 'Himachal Pradesh'});
				states.push({state: 'Jammu and Kashmir'});
				states.push({state: 'Jharkhand'});
				states.push({state: 'Karnataka'});
				states.push({state: 'Kerala'});
				states.push({state: 'Lakshadweep'});
				states.push({state: 'Madhya Pradesh'});
				states.push({state: 'Maharashtra'});
				states.push({state: 'Manipur'});
				states.push({state: 'Meghalaya'});
				states.push({state: 'Mizoram'});
				states.push({state: 'Nagaland'});
				states.push({state: 'Orissa'});
				states.push({state: 'Pondicherry'});
				states.push({state: 'Punjab'});
				states.push({state: 'Rajasthan'});
				states.push({state: 'Sikkim'});
				states.push({state: 'Tamil Nadu'});
				states.push({state: 'Tripura'});
				states.push({state: 'Uttar Pradesh'});
				states.push({state: 'Uttaranchal'});
				states.push({state: 'West Bengal'});
			return states;
		}			
	};
});


mainApp.service('PurchaseOrderService', function() {
	// returning object of as default value
		return {
			getAllOrders : function() {
				purchaseOrders = [];
				for(i=0; i <= 35; i++){
					purchaseOrders.push({orderDate: '2016/01/0'+i, invoiceNo: 10+i, partyName : 'Pravin '+i, totalQuantity: 20, totalAmount: 2450, isThroughBroker: i%2==0?true:false });
				}
				return purchaseOrders;
			}			
		};
});

mainApp.service('SaleOrderService', function() {
	// returning object of as default value
		return {
			getAllOrders : function() {
				saleOrders = [];
				for(i=0; i <= 35; i++){
					saleOrders.push({orderDate: '2016/01/0'+i, invoiceNo: 10+i, partyName : 'Pravin '+i, totalQuantity: 20, totalAmount: 2450, isThroughBroker: i%2==0?true:false });
				}
				return saleOrders;
			}			
		};
});