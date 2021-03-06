import React, { useState } from 'react';
import Button from '@leafygreen-ui/button';
import Input from './Input';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { keyMap } from '@leafygreen-ui/lib';
import { OrganizationTrigger, ProjectTrigger } from './Trigger';
import { useOnElementClick } from '../on-element-click-provider';
import {
  Menu,
  FocusableMenuItem,
  MenuItem,
  MenuSeparator,
} from '@leafygreen-ui/menu';
import {
  ProjectInterface,
  OrganizationInterface,
  URLSInterface,
  CurrentProjectInterface,
  CurrentOrganizationInterface,
  PlanType,
  NavElement,
} from '../types';

const menuItemHeight = 36;

const menuContainerStyle = css`
  position: relative;
  width: 280px;
  padding-top: 20px;
`;

const menuItemContainerStyle = css`
  flex-direction: row;
  justify-content: space-between;
  text-align: left;
`;

const ulStyle = css`
  max-height: ${5 * menuItemHeight}px;
  list-style: none;
  padding: unset;
  overflow-y: auto;
`;

const viewAllStyle = css`
  color: ${uiColors.blue.base};
`;

const projectButtonStyle = css`
  display: flex;
  justify-content: space-around;
  padding-top: 16px;
  padding-bottom: 16px;
`;

const nameStyle = css`
  font-size: 14px;
  color: ${uiColors.gray.dark3};
`;

const productStyle = css`
  font-size: 12px;
  color: ${uiColors.gray.dark2};
  font-weight: bolder;
  white-space: nowrap;
`;

const orgOptionContainerStyle = css`
  display: flex;
  justify-content: space-between;
`;

const noOrgStyle = css`
  font-size: 14px;
  padding: 4px 8px;
  margin-bottom: 20px;
`;

const allOrgLinkStyle = css`
  color: ${uiColors.blue.base};
  text-decoration: none;
  &:visited {
    color: ${uiColors.blue.base};
    text-decoration: none;
  }
`;

const formattedPlanTypes: Record<PlanType, string> = {
  [PlanType.Atlas]: 'Atlas',
  [PlanType.Cloud]: 'Cloud Manager',
  [PlanType.OnPrem]: 'Ops Manager',
} as const;

interface BaseMongoSelectProps {
  onClick?: React.MouseEventHandler;
  className?: string;
  urls: Required<URLSInterface>;
  onChange: React.ChangeEventHandler;
  isActive?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

interface ProjectMongoSelectProps extends BaseMongoSelectProps {
  data?: Array<ProjectInterface>;
  current?: CurrentProjectInterface;
  constructProjectURL: (orgID: string, projectID: string) => string;
}

interface OrganizationMongoSelectProps extends BaseMongoSelectProps {
  data?: Array<OrganizationInterface>;
  current?: CurrentOrganizationInterface;
  constructOrganizationURL: (orgID: string) => string;
  isOnPrem?: boolean;
}

const onKeyDown: React.KeyboardEventHandler = e => {
  // Stops default browser behavior from automatically scrolling the component
  if ([keyMap.ArrowUp, keyMap.ArrowDown].includes(e.keyCode)) {
    e.preventDefault();
  }
};

function OrgSelect({
  current,
  data,
  urls,
  isActive,
  onChange,
  onClick,
  constructOrganizationURL,
  isOnPrem,
  disabled,
  loading = false,
}: OrganizationMongoSelectProps) {
  const [open, setOpen] = useState(false);
  const onElementClick = useOnElementClick();

  const renderOrganizationOption = (datum: OrganizationInterface) => {
    const { orgId, orgName, planType } = datum;

    return (
      <MenuItem
        data-testid="org-option"
        key={orgId}
        className={menuItemContainerStyle}
        onClick={onClick}
        href={constructOrganizationURL(orgId)}
      >
        <div className={orgOptionContainerStyle}>
          <span className={nameStyle}>{orgName}</span>

          {!isOnPrem && (
            <span className={productStyle}>{formattedPlanTypes[planType]}</span>
          )}
        </div>
      </MenuItem>
    );
  };

  return (
    <OrganizationTrigger
      placeholder={disabled ? 'All Organizations' : current?.orgName ?? ''}
      urls={urls}
      isActive={isActive}
      open={open}
      disabled={disabled}
      loading={loading}
      onClick={onElementClick(NavElement.OrgNavOrgSelectTrigger, () =>
        setOpen(current => !current),
      )}
    >
      <Menu
        usePortal={false}
        className={menuContainerStyle}
        justify="start"
        spacing={0}
        setOpen={setOpen}
        open={open}
      >
        {data && (
          <FocusableMenuItem>
            <Input
              data-testid="org-filter-input"
              variant="organization"
              onChange={onChange}
              onKeyDown={onKeyDown}
            />
          </FocusableMenuItem>
        )}

        <ul className={ulStyle}>
          {data?.map(renderOrganizationOption) ?? (
            <li className={noOrgStyle}>
              You do not belong to any organizations. Create an organization on
              the{' '}
              <a
                href={urls.mongoSelect.viewAllOrganizations}
                className={allOrgLinkStyle}
              >
                Organizations
              </a>{' '}
              page.
            </li>
          )}
        </ul>

        {data && (
          <>
            <MenuSeparator />
            <MenuItem
              onKeyDown={onKeyDown}
              href={urls.mongoSelect?.viewAllOrganizations}
              data-testid="org-select-view-all-orgs"
              onClick={onElementClick(NavElement.OrgNavViewAllOrganizations)}
            >
              <strong className={viewAllStyle}>View All Organizations</strong>
            </MenuItem>
          </>
        )}
      </Menu>
    </OrganizationTrigger>
  );
}

OrgSelect.displayName = 'OrgSelect';

export { OrgSelect };

function ProjectSelect({
  current,
  onChange,
  data,
  onClick,
  constructProjectURL,
  urls,
  loading = false,
}: ProjectMongoSelectProps) {
  const [open, setOpen] = useState(false);
  const onElementClick = useOnElementClick();

  const renderProjectOption = (datum: ProjectInterface) => {
    const { projectId, projectName, orgId } = datum;

    return (
      <MenuItem
        data-testid="project-option"
        key={projectId}
        className={cx(menuItemContainerStyle, nameStyle)}
        onClick={onClick}
        href={constructProjectURL(orgId, projectId)}
      >
        {projectName}
      </MenuItem>
    );
  };

  return (
    <ProjectTrigger
      placeholder={current?.projectName ?? ''}
      open={open}
      loading={loading}
      onClick={onElementClick(NavElement.ProjectNavProjectSelectTrigger, () =>
        setOpen(curr => !curr),
      )}
    >
      <Menu
        usePortal={false}
        className={menuContainerStyle}
        justify="start"
        spacing={0}
        open={open}
        setOpen={setOpen}
        data-testid="project-select-project-list"
      >
        <FocusableMenuItem>
          <Input
            data-testid="project-filter-input"
            onChange={onChange}
            onKeyDown={onKeyDown}
            variant="project"
          />
        </FocusableMenuItem>

        <ul className={ulStyle}>
          {data?.map(datum => renderProjectOption(datum))}
        </ul>

        <MenuSeparator />

        <li onKeyDown={onKeyDown} role="none" className={projectButtonStyle}>
          <FocusableMenuItem>
            <Button
              href={urls.mongoSelect.viewAllProjects as string}
              data-testid="project-select-view-all-projects"
              onClick={onElementClick(NavElement.ProjectNavViewAllProjects)}
            >
              View All Projects
            </Button>
          </FocusableMenuItem>
          <FocusableMenuItem>
            <Button
              href={urls.mongoSelect.newProject as string}
              data-testid="project-select-add-new-project"
              onClick={onElementClick(NavElement.ProjectNavAddProject)}
            >
              + New Project
            </Button>
          </FocusableMenuItem>
        </li>
      </Menu>
    </ProjectTrigger>
  );
}

ProjectSelect.displayName = 'ProjectSelect';

export { ProjectSelect };
