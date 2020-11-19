const premium = [{
    age: '0-4', // 年龄
    plan1: {    // 1万元免赔额
        annual: {   // 年缴
            isMedical: 751,     // 有医保
            notMedical: 1560    // 无医保
        },
        monthly: {  // 月缴
            isMedical: 68.1,    // 有医保
            notMedical: 141.6   // 无医保
        }
    },
    plan2: {    // 5千元免赔额
        annual: {   // 年缴
            isMedical: 1122,    // 有医保
            notMedical: 2308    // 无医保
        },
        monthly: {  // 月缴
            isMedical: 101.8,   // 有医保
            notMedical: 209.6   // 无医保
        }
    }  
}, {
    age: '5-10',
    plan1: {
        annual: {
            isMedical: 330,
            notMedical: 660
        },
        monthly: {
            isMedical: 29.8,
            notMedical: 59.9
        }
    },
    plan2: {
        annual: {
            isMedical: 500,
            notMedical: 1005
        },
        monthly: {
            isMedical: 45.2,
            notMedical: 91.2
        }
    } 
}, {
    age: '11-15',
    plan1: {
        annual: {
            isMedical: 132,
            notMedical: 288
        },
        monthly: {
            isMedical: 11.9,
            notMedical: 26
        }
    },
    plan2: {
        annual: {
            isMedical: 212,
            notMedical: 449
        },
        monthly: {
            isMedical: 19.1,
            notMedical: 40.7
        }
    } 
}, {
    age: '16-20',
    plan1: {
        annual: {
            isMedical: 156,
            notMedical: 336
        },
        monthly: {
            isMedical: 14,
            notMedical: 30.4
        }
    },
    plan2: {
        annual: {
            isMedical: 247,
            notMedical: 510
        },
        monthly: {
            isMedical: 22.3,
            notMedical: 46.2
        }
    } 
}, {
    age: '21-25',
    plan1: {
        annual: {
            isMedical: 219,
            notMedical: 480
        },
        monthly: {
            isMedical: 19.7,
            notMedical: 43.5
        }
    },
    plan2: {
        annual: {
            isMedical: 331,
            notMedical: 731
        },
        monthly: {
            isMedical: 29.9,
            notMedical: 66.3
        }
    } 
}, {
    age: '26-30',
    plan1: {
        annual: {
            isMedical: 276,
            notMedical: 636
        },
        monthly: {
            isMedical: 24.9,
            notMedical: 57.6
        }
    },
    plan2: {
        annual: {
            isMedical: 425,
            notMedical: 962
        },
        monthly: {
            isMedical: 39.5,
            notMedical: 87.2
        }
    } 
}, {
    age: '31-35',
    plan1: {
        annual: {
            isMedical: 370,
            notMedical: 876
        },
        monthly: {
            isMedical: 33.4,
            notMedical: 79.5
        }
    },
    plan2: {
        annual: {
            isMedical: 560,
            notMedical: 1316
        },
        monthly: {
            isMedical: 50.7,
            notMedical: 119.5
        }
    } 
}, {
    age: '36-40',
    plan1: {
        annual: {
            isMedical: 457,
            notMedical: 1224
        },
        monthly: {
            isMedical: 41.4,
            notMedical: 111.1
        }
    },
    plan2: {
        annual: {
            isMedical: 689,
            notMedical: 1801
        },
        monthly: {
            isMedical: 62.5,
            notMedical: 163.6
        }
    } 
}, {
    age: '41-45',
    plan1: {
        annual: {
            isMedical: 556,
            notMedical: 1920
        },
        monthly: {
            isMedical: 50.3,
            notMedical: 174.4
        }
    },
    plan2: {
        annual: {
            isMedical: 857,
            notMedical: 2681
        },
        monthly: {
            isMedical: 77.7,
            notMedical: 243.5
        }
    } 
}, {
    age: '46-50',
    plan1: {
        annual: {
            isMedical: 863,
            notMedical: 2688
        },
        monthly: {
            isMedical: 78.2,
            notMedical: 244.1
        }
    },
    plan2: {
        annual: {
            isMedical: 1296,
            notMedical: 4195
        },
        monthly: {
            isMedical: 117.6,
            notMedical: 381.1
        }
    } 
}, {
    age: '51-55',
    plan1: {
        annual: {
            isMedical: 1066,
            notMedical: 3600
        },
        monthly: {
            isMedical: 96.7,
            notMedical: 327.1
        }
    },
    plan2: {
        annual: {
            isMedical: 1599,
            notMedical: 5493
        },
        monthly: {
            isMedical: 145.1,
            notMedical: 499.1
        }
    } 
}, {
    age: '56-60',
    plan1: {
        annual: {
            isMedical: 1431,
            notMedical: 4788
        },
        monthly: {
            isMedical: 129.9,
            notMedical: 435.1
        }
    },
    plan2: {
        annual: {
            isMedical: 2149,
            notMedical: 6860
        },
        monthly: {
            isMedical: 195.1,
            notMedical: 623.4
        }
    } 
}, {
    age: '61-65',
    plan1: {
        annual: {
            isMedical: 2280,
            notMedical: 7944
        },
        monthly: {
            isMedical: 207.1,
            notMedical: 722
        }
    },
    plan2: {
        annual: {
            isMedical: 2791,
            notMedical: 10125
        },
        monthly: {
            isMedical: 253.6,
            notMedical: 920.3
        }
    } 
}, {
    age: '66-70',
    plan1: {
        annual: {
            isMedical: 2976,
            notMedical: 9928
        },
        monthly: {
            isMedical: 248.1,
            notMedical: 827.4
        }
    },
    plan2: {
        annual: {
            isMedical: 4381,
            notMedical: 12624
        },
        monthly: {
            isMedical: 365.2,
            notMedical: 1052.1
        }
    } 
}, {
    age: '71-75',
    plan1: {
        annual: {
            isMedical: 3766,
            notMedical: 10866
        },
        monthly: {
            isMedical: 313.9,
            notMedical: 905.6
        }
    },
    plan2: {
        annual: {
            isMedical: 5638,
            notMedical: 16373
        },
        monthly: {
            isMedical: 469.9,
            notMedical: 1364.5
        }
    } 
}, {
    age: '76-80',
    plan1: {
        annual: {
            isMedical: 4566,
            notMedical: 13487
        },
        monthly: {
            isMedical: 380.6,
            notMedical: 1123.9
        }
    },
    plan2: {
        annual: {
            isMedical: 6876,
            notMedical: 20215
        },
        monthly: {
            isMedical: 573.1,
            notMedical: 1684.6
        }
    } 
}, {
    age: '81-85',
    plan1: {
        annual: {
            isMedical: 7113,
            notMedical: 20663
        },
        monthly: {
            isMedical: 592.8,
            notMedical: 1721.9
        }
    },
    plan2: {
        annual: {
            isMedical: 10765,
            notMedical: 31319
        },
        monthly: {
            isMedical: 897.2,
            notMedical: 2609.9
        }
    } 
}, {
    age: '86-90',
    plan1: {
        annual: {
            isMedical: 9078,
            notMedical: 25629
        },
        monthly: {
            isMedical: 756.5,
            notMedical: 2135.8
        }
    },
    plan2: {
        annual: {
            isMedical: 13686,
            notMedical: 39211
        },
        monthly: {
            isMedical: 1140.5,
            notMedical: 3267.6
        }
    } 
}, {
    age: '91-95',
    plan1: {
        annual: {
            isMedical: 11548,
            notMedical: 31776
        },
        monthly: {
            isMedical: 962.4,
            notMedical: 2648.1
        }
    },
    plan2: {
        annual: {
            isMedical: 17366,
            notMedical: 48987
        },
        monthly: {
            isMedical: 1447.2,
            notMedical: 4082.3
        }
    } 
}, {
    age: '96-100',
    plan1: {
        annual: {
            isMedical: 14688,
            notMedical: 39521
        },
        monthly: {
            isMedical: 1224,
            notMedical: 3293.5
        }
    },
    plan2: {
        annual: {
            isMedical: 22118,
            notMedical: 61870
        },
        monthly: {
            isMedical: 1843.2,
            notMedical: 5155.9
        }
    } 
}]


const queryPremium = (firstYear = '0', medical = '0', paymode = '0', plan = '0') => {
    medical = medical == 0 ? 'isMedical' : 'notMedical'
    paymode = paymode == 0 ? 'monthly' : 'annual'
    plan = plan == 0 ? 'plan1' : 'plan2'
    const data = []
    premium.map(item => {
        data.push({
            age: item.age,
            premium: item[plan][paymode][medical]
        })
    })
    if (firstYear == 0) {
        return data.slice(0, data.length-7)
    }
    return data
}

export default queryPremium
