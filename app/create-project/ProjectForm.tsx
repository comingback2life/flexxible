'use client';

import { SessionInterface } from '@/common.types';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import FormField from './FormField';
import { categoryFilters } from '@/constants';
import CustomMenu from './CustomMenu';
type Props = {
  type: string;
  session: SessionInterface;
};

enum PossibleChildTypes {
  Create = 'create',
}
const ProjectForm = ({ type, session }: Props) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    site: '',
    githubURL: '',
    category: '',
    createdBy: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {};
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {};
  const handleStateChange = (fieldName: string, value: string) => {};
  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && 'Choose a thumbnail for your project.'}
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          required={type === PossibleChildTypes.Create}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form?.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="Project Poster"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form?.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange('title', value)}
      />
      <FormField
        title="Description"
        state={form?.description}
        placeholder="Showcase and discover remarkable dev projects"
        setState={(value) => handleStateChange('description', value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form?.site}
        placeholder="https://hello.com"
        setState={(value) => handleStateChange('liveSiteUrl', value)}
      />
      <FormField
        type="url"
        title="Github URL"
        state={form?.githubURL}
        placeholder="Github URL"
        setState={(value) => handleStateChange('githubURL', value)}
      />
      <CustomMenu
        title="Category"
        state={form?.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />
      <div className="flexStart w-full">
        <button>Create</button>
      </div>
    </form>
  );
};

export default ProjectForm;
