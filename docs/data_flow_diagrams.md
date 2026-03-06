# Finsight - Data Flow Diagrams (DFD)

## Table of Contents
1. [Level 0: Context Diagram](#level-0-context-diagram)
2. [Level 1: System Overview](#level-1-system-overview)
3. [Level 2: Module Details](#level-2-module-details)
   - [User Management Module](#user-management-module)
   - [Transaction Management Module](#transaction-management-module)
   - [Budget Management Module](#budget-management-module)
   - [Account Management Module](#account-management-module)
   - [Reporting and Analysis Module](#reporting-and-analysis-module)
   - [Data Import/Export Module](#data-importexport-module)

## Level 0: Context Diagram

```mermaid
flowchart TD
    User["User"] -->|1. Login Credentials| Finsight[("Finsight System")]
    User -->|2. Account Details| Finsight
    User -->|3. Transaction Data| Finsight
    User -->|4. Receipt Images| Finsight
    User -->|5. Report Requests| Finsight
    
    Finsight -->|A. Authentication Status| User
    Finsight -->|B. Account Balances| User
    Finsight -->|C. Transaction History| User
    Finsight -->|D. Dashboards & Reports| User
    
    Finsight -->|6. Receipt Images| RSS[("Receipt Scanning Service")]
    RSS -->|7. Extracted Transaction Data| Finsight
```

**Data Flows:**
1. User credentials for authentication
2. Account details for management
3. Transaction data for recording
4. Receipt images for processing
5. Report generation requests
6. Receipt images for scanning
7. Extracted transaction data

## Level 1: System Overview

```mermaid
flowchart TD
    User["User"] -->|1. Authentication| UM[User Management]
    User -->|2. Account Operations| AM[Account Management]
    User -->|3. Transaction Data| TM[Transaction Management]
    User -->|4. Budget Settings| BM[Budget Management]
    User -->|5. Report Requests| RM[Reporting Module]
    User -->|6. Data Files| IM[Import/Export]
    
    subgraph Finsight["Finsight System"]
        UM -->|User Data| DB[(Users)]
        AM -->|Account Data| DB2[(Accounts)]
        TM -->|Transaction Data| DB3[(Transactions)]
        BM -->|Budget Data| DB4[(Budgets)]
        
        TM -->|Receipt Images| RSS[Receipt Scanning Service]
        RSS -->|Extracted Data| TM
        
        RM <-->|Read Data| DB2
        RM <-->|Read Data| DB3
        RM <-->|Read Data| DB4
        
        IM <-->|Import/Export| DB2
        IM <-->|Import/Export| DB3
    end
    
    UM -->|7. Auth Status| User
    AM -->|8. Account Updates| User
    TM -->|9. Transaction Confirmations| User
    BM -->|10. Budget Alerts| User
    RM -->|11. Reports| User
    IM -->|12. Export Files| User
```

## Level 2: Module Details

### User Management Module

```mermaid
flowchart TD
    User["User"] -->|1. Register| A[Register User]
    User -->|2. Login| B[Authenticate User]
    User -->|3. Logout| C[End Session]
    User -->|4. Update Profile| D[Update User Data]
    
    A -->|Store| DB[(Users)]
    B -->|Verify| DB
    C -->|Update| DB
    D -->|Update| DB
    
    A -->|5. Confirmation| User
    B -->|6. Auth Token| User
    C -->|7. Logout Confirmation| User
    D -->|8. Update Confirmation| User
```

### Transaction Management Module

```mermaid
flowchart TD
    User["User"] -->|1. Manual Entry| A[Record Transaction]
    User -->|2. Receipt Image| B[Process Receipt]
    User -->|3. Categorize| C[Update Transaction]
    
    B -->|Send Image| RSS[Receipt Scanning Service]
    RSS -->|Extracted Data| B
    
    A -->|Save| DB1[(Transactions)]
    B -->|Save| DB1
    C -->|Update| DB1
    
    A -->|4. Update Balance| AM[Account Management]
    
    A -->|5. Confirmation| User
    B -->|6. Extracted Data| User
    C -->|7. Update Confirmation| User
```

### Budget Management Module

```mermaid
flowchart TD
    User["User"] -->|1. Set Budget| A[Create/Update Budget]
    User -->|2. View Budget| B[Generate Budget Report]
    
    A -->|Store/Update| DB[(Budgets)]
    B -->|Read| DB
    
    B -->|Read Transactions| DB2[(Transactions)]
    
    A -->|3. Budget Created| User
    B -->|4. Budget Report| User
    
    TM[Transaction Module] -->|5. Transaction Updates| C[Calculate Budget vs Actual]
    C -->|6. Update Progress| DB
    C -->|7. Alert if Exceeded| User
```

### Account Management Module

```mermaid
flowchart TD
    User["User"] -->|1. Add Account| A[Create Account]
    User -->|2. Update Account| B[Modify Account]
    User -->|3. Remove Account| C[Delete Account]
    
    A -->|Store| DB[(Accounts)]
    B -->|Update| DB
    C -->|Mark Inactive| DB
    
    A -->|4. Account Created| User
    B -->|5. Update Confirmation| User
    C -->|6. Deletion Confirmation| User
    
    TM[Transaction Module] -->|7. Balance Updates| B
    B -->|8. Update Balance| DB
```

### Reporting and Analysis Module

```mermaid
flowchart TD
    User["User"] -->|1. Report Request| A[Process Request]
    
    A -->|Read Data| DB1[(Transactions)]
    A -->|Read Data| DB2[(Accounts)]
    A -->|Read Data| DB3[(Budgets)]
    
    A -->|2. Generate Report| B[Format Report]
    
    B -->|3. Display Report| User
    B -->|4. Export Option| C[Export Report]
    
    C -->|5. Export File| User
```

### Data Import/Export Module

```mermaid
flowchart TD
    User["User"] -->|1. Import File| A[Validate Format]
    User -->|2. Export Request| B[Prepare Export]
    
    A -->|Valid| C[Process Import]
    A -->|Invalid| D[Return Error]
    
    C -->|Import Data| DB1[(Transactions)]
    C -->|Import Data| DB2[(Accounts)]
    
    B -->|Read Data| DB1
    B -->|Read Data| DB2
    
    C -->|3. Import Summary| User
    B -->|4. Export File| User
    D -->|5. Error Details| User
```

## Data Dictionary

### Data Stores

**Users**
- user_id (PK)
- email
- password_hash
- full_name
- created_at
- last_login

**Accounts**
- account_id (PK)
- user_id (FK)
- account_name
- account_type
- balance
- currency
- is_active
- created_at

**Transactions**
- transaction_id (PK)
- account_id (FK)
- amount
- date
- category_id (FK)
- description
- type (income/expense)
- created_at

**Budgets**
- budget_id (PK)
- user_id (FK)
- category_id (FK)
- amount
- period (monthly/yearly)
- start_date
- end_date
- created_at

**Categories**
- category_id (PK)
- name
- type (income/expense)
- user_id (FK, NULL for default categories)
- icon
- color

## Notes

1. All diagrams follow standard DFD notation:
   - External entities: Rectangles
   - Processes: Rounded rectangles
   - Data stores: Open-ended rectangles
   - Data flows: Arrows with labels

2. Security considerations:
   - Authentication required for all user interactions
   - Data validation at all entry points
   - Input sanitization to prevent injection attacks

3. Performance considerations:
   - Caching frequently accessed data
   - Indexing for frequently queried fields
   - Batch processing for large data exports

4. Error handling:
   - Clear error messages for user actions
   - Logging of system errors
   - Data validation before processing

5. Future extensions:
   - Multi-currency support
   - Bank integration
   - Investment tracking
   - Tax preparation features
